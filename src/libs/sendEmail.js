import B from "bluebird";
import nodemailer from "nodemailer";
import clone from "lodash/clone";
import isEmpty from "lodash/isEmpty";
import S from "underscore.string";
import Transport from "nodemailer-mailgun-transport";
import getVariable from "../config/getVariable";
import L from "../logger/logger";

const config = {
  debug: getVariable("MAILGUN_DEBUG_ENABLED"),
  auth: {
    api_key: getVariable("MAILGUN_API_KEY"),
    domain: getVariable("MAILGUN_DOMAIN"),
  },
  sender: getVariable("EMAIL_DEFAULT_SENDER"),
};

const transporter = B.promisifyAll(nodemailer.createTransport(Transport(config)));

export default (options) => {
  const opts = clone(options) || {};

  if (isEmpty(opts.from)) {
    opts.from = getVariable("EMAIL_DEFAULT_SENDER");
  }

  if (getVariable("EMAIL_DEFAULT_RECIPIENT")) {
    L.warn("recipient %s has been replaced by %s=%s", opts.to, "process.env.EMAIL_DEFAULT_RECIPIENT", getVariable("EMAIL_DEFAULT_RECIPIENT"));
    opts.html = `${opts.html}<hr>Original Recipient: ${opts.to}`;
    opts.to = getVariable("EMAIL_DEFAULT_RECIPIENT");
    delete opts.cc;
    delete opts.bcc;
  }

  if (opts.subject) {
    opts.subject = S.stripTags(opts.subject);
  }

  if (S.toBoolean(getVariable("EMAIL_DELIVERY_ACTIVE"))) {
    return transporter.sendMailAsync(opts)
      .then(() => L.info("with subject \"%s\" has been sent to %s", opts.subject, opts.to))
      .catch(error => L.error(`Sending email to %s returned with error: ${error.message}`));
  }

  L.warn("email to %s has been turned off because %s=%s", opts.to, "process.env.EMAIL_DELIVERY_ACTIVE", getVariable("EMAIL_DELIVERY_ACTIVE"));
  return B.resolve(true);
};
