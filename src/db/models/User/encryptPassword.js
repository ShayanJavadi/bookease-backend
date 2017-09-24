import crypto from "crypto";

export default (passwordInPlainText) => {
  const sha = crypto.createHash("sha1");
  sha.update(passwordInPlainText);
  return sha.digest("hex");
};
