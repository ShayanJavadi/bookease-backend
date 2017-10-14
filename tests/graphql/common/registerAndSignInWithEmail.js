import sendVerificationCodeToEmail from "./sendVerificationCodeToEmail";
import verifyEmail from "./verifyEmail";
import signInWithEmail from "./signInWithEmail";

export default ({ email }) => sendVerificationCodeToEmail({ email })
  .then((registeredUser) => verifyEmail(registeredUser)
    .then((verifiedUser) => signInWithEmail({ id: verifiedUser.id, email: email, password: registeredUser.verificationCode })
      .then(() => verifiedUser)));
