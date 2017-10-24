import isEmpty from "lodash/isEmpty";
import GoogleCloudStorage from "@google-cloud/storage";
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
    private_key: getVariable("FIREBASE_PRIVATE_KEY"),
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
  const fileNameInGCS = `${Date.now().valueOf()}-${req.file.originalname}`;
  const file = bucket.file(fileNameInGCS);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err; // eslint-disable-line
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = fileNameInGCS; // eslint-disable-line
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${fileNameInGCS}`; // eslint-disable-line
      next();
    });
  });

  return stream.end(req.file.buffer);
};
