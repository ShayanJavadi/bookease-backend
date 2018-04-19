import sendSms from "../../../libs/sendSms";
import getVariable from "../../../config/getVariable";
import isDevelopment from "../../../config/isDevelopment";

export default (user) => {
  if (isDevelopment()) {
    return Promise.resolve();
  }

  const body = `${user.verificationCode} is your ${getVariable("APP_NAME")} verification code`;
  const to = user.phoneNumber;

  return sendSms({
    body,
    to,
  });
};
