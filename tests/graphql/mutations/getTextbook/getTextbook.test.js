import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import gql from "../../../libs/gql";
import CREATE_TEXTBOOK from "../createTextbook/createTextbook.graphql";
import GET_TEXTBOOK from "./getTextbook.graphql";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should NOT return the created textbook since it is not published", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(user => {
      const textbook = {
        title: "Algorithm with ISBN",
        description: "Book for sale",
        industryIdentifiers: [
          {
            type: "ISBN10",
            identifier: "1848000707"
          }],
        authors: ["John Smith"],
        images: [{
          thumbnail: "https://abc/def"
        }]
      };

      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => gql({
          query: GET_TEXTBOOK,
          variables: {
            textbookId: createdTextbook.id
          }
        }))
        .then((createdTextbook) => {
          expect(createdTextbook).toBeNull();
        });
    })
    .then(() => done())
    .catch(done);
});
