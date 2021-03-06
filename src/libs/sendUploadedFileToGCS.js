import isEmpty from "lodash/isEmpty";
import GoogleCloudStorage from "@google-cloud/storage";
import jimp from "jimp";
import getVariable from "../config/getVariable";

export default (req, res, next) => {
  if (isEmpty(req.file)) {
    return res.status(400)
      .send("No files were uploaded!");
  }
  const serviceAccount = {
    type: "service_account",
    project_id: getVariable("FIREBASE_PROJECT_ID"),
    private_key_id: getVariable("FIREBASE_PRIVATE_KEY_ID"),
    private_key: getVariable("FIREBASE_PRIVATE_KEY").replace(/(?:\\[rn])/g, "\n"),
    client_email: getVariable("FIREBASE_CLIENT_EMAIL"),
    client_id: getVariable("FIREBASE_CILENT_ID"),
    auth_uri: getVariable("FIREBASE_AUTH_URI"),
    token_uri: getVariable("FIREBASE_TOKEN_URI"),
    auth_provider_x509_cert_url: getVariable("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    client_x509_cert_url: getVariable("FIREBASE_CLIENT_X509_CERT_URL"),
  };

  const gcs = GoogleCloudStorage({
    credentials: serviceAccount,
    projectId: getVariable("FIREBASE_PROJECT_ID"),
  });

  const bucketName = getVariable("FIREBASE_STORAGE_BUCKET");
  const bucket = gcs.bucket(bucketName);
  const dateIdentifier = Date.now().valueOf();
  const matchFileExtension = /(\.[\w\d_-]+)$/i;
  const enforceFileExtension = imageName => (
    matchFileExtension.test(imageName) ?
      imageName :
      `${imageName}.jpg`
  );

  const fileNameInGCS = `${dateIdentifier}-${enforceFileExtension(req.file.originalname)}`;
  const file = bucket.file(fileNameInGCS);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  const createThumbnail = (buffer, gcsBucket) => new Promise((resolve, reject) => {
    jimp.read(buffer, (readError, image) => {
      const thumbnail = image.resize(10, 10);
      thumbnail.getBuffer("image/png", (bufferError, base64) => {
        const base64File = gcsBucket.file(`${fileNameInGCS.replace(matchFileExtension, "-thumbnail$1")}`);
        base64File.save(base64, {
          public: true,
          validation: "md5",
        }, (err) => {
          if (err) {
            return reject(err);
          }

          return resolve();
        });
      });
    });
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err; // eslint-disable-line
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = fileNameInGCS; // eslint-disable-line
    file.makePublic().then(() => {
      createThumbnail(req.file.buffer, bucket).then(() => {
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${fileNameInGCS}`; // eslint-disable-line
        next();
      });
    });
  });

  return stream.end(req.file.buffer);
};
