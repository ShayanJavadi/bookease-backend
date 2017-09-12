import sendEmail from "../../../libs/sendEmail";
import getVariable from "../../../config/getVariable";
import wrapEmailContent from "../../../libs/wrapEmailContent";

export default (user) => {
  const subject = `${user.verificationCode} is your ${getVariable("APP_NAME")} verification code`;
  const html = wrapEmailContent(`
    <p>Please use the following code to verify your email address:</p>
    <h1>${user.verificationCode}</h1>
    <p style="font-size: 90%">If you did not request for this code, simply ignore it.</p>
  `);
  const to = user.email;

  return sendEmail({
    subject,
    html,
    to,
  });
};
