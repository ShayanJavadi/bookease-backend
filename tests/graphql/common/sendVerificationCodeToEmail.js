import gql from "../../libs/gql";
import db from "../../../src/db";
import SEND_VERIFICATION_CODE from "./sendVerificationCodeToEmail.graphql";

export default ({ email }) => gql({
  query: SEND_VERIFICATION_CODE,
  variables: {
    email
  }
})
  .then((sendVerificationStatus) => {
    expect(sendVerificationStatus).toBe(200);
    const { models: { User } } = db;

    return User.find({
      where: { email }
    });
  })
  .then(user => {
    expect(user.email).toBe(email);
    expect(user.verificationCode).toBeTruthy();
    return user;
  });

