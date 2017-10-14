import gql from "../../libs/gql";
import SIGN_IN_WITH_EMAIL from "./signInWithEmail.graphql";

export default ({ id, email, password }) => gql({
  query: SIGN_IN_WITH_EMAIL,
  variables: {
    email,
    password
  }
})
  .then(signedInUser => {
    expect(signedInUser.id).toBe(id);
    return signedInUser;
  });
