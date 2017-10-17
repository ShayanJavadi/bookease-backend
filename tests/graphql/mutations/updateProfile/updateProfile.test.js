import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import gql from "../../../libs/gql";
import UPDATE_PROFILE from "./updateProfile.graphql";
import signOut from "../../common/signOut";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should not be able to update profile if not logged in", (done) => {
  return signOut()
    .then(() => {
      const name = "Duy Nguyen";
      const schoolId = "DJ6363ST";

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          name,
          schoolId
        }
      })
        .catch(error => {
          expect(error).toBeTruthy();
        });
    })
    .then(() => done())
    .catch(done);
});