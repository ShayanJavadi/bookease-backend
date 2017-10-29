import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import gql from "../../../libs/gql";
import CREATE_TEXTBOOK from "./createTextbook.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should created textbook correctly", (done) => {
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
        }],
        condition: FAIR,
        price: 10.99
      };

      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then(createdTextbook => {
          expect(createdTextbook.userId).toBe(user.id);
          expect(createdTextbook.title).toBe(textbook.title);
          expect(createdTextbook.description).toBe(textbook.description);
          expect(createdTextbook.industryIdentifiers).toEqual(textbook.industryIdentifiers);
          expect(createdTextbook.authors).toEqual(textbook.authors);
          expect(createdTextbook.images).toEqual(textbook.images);
          expect(createdTextbook.createdAt).not.toBeNull();
          expect(createdTextbook.updatedAt).not.toBeNull();
          expect(createdTextbook.publishedAt).toBeNull();
          expect(createdTextbook.condition).toBe(textbook.condition);
          expect(createdTextbook.price).toBe(textbook.price);
        });
    })
    .then(() => done())
    .catch(done);
});
