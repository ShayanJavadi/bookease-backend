import sendSms from "../../../libs/sendSms";
import getVariable from "../../../config/getVariable";

export default (user) => {
  const body = `${user.verificationCode} is your ${getVariable("APP_NAME")} verification code`;
  const to = user.phoneNumber;

  return sendSms({
    body,
    to,
  });
};
