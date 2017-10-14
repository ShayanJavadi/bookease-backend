import gql from "../../libs/gql";
import db from "../../../src/db";
import VERIFY_EMAIL from "./verifyEmail.graphql";

export default ({ email, verificationCode }) => gql({
  query: VERIFY_EMAIL,
  variables: {
    email,
    verificationCode
  }
})
  .then(verificationStatus => {
    expect(verificationStatus).toBe(200);

    const { models: { User } } = db;

    return User.find({
      where: { email }
    });
  })
  .then(user => {
    expect(user.email).toBe(email);
    expect(user.password).toBeTruthy();
    expect(user.isVerified).toBeTruthy();
    return user;
  });
