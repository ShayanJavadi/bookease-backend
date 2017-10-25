import gql from "../../libs/gql";
import SIGN_OUT from "./signOut.graphql";

export default () => gql({
  query: SIGN_OUT
})
  .then(status => {
    expect(status).toBe(200);
    return status;
  });
