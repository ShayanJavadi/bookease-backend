import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import gql from "../../../libs/gql";
import CREATE_TEXTBOOK from "../createTextbook/createTextbook.graphql";
import GET_MY_TEXTBOOK from "./getMyTextbook.graphql";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should return the created textbook correctly", (done) => {
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
          query: GET_MY_TEXTBOOK,
          variables: {
            textbookId: createdTextbook.id
          }
        }))
        .then((createdTextbook) => {
          expect(createdTextbook.userId).toBe(user.id);
          expect(createdTextbook.title).toBe(textbook.title);
          expect(createdTextbook.description).toBe(textbook.description);
          expect(createdTextbook.industryIdentifiers).toEqual(textbook.industryIdentifiers);
          expect(createdTextbook.authors).toEqual(textbook.authors);
          expect(createdTextbook.images).toEqual(textbook.images);
          expect(createdTextbook.publishedAt).toBeNull();
        });
    })
    .then(() => done())
    .catch(done);
});
