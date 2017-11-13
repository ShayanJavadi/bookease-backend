import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signInWithEmail from "../../common/signInWithEmail";
import gql from "../../../libs/gql";
import UPDATE_TEXTBOOK from "./updateTextbook.graphql";
import CREATE_TEXTBOOK from "../createTextbook/createTextbook.graphql";
import {GOOD, EXCELLENT} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

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
  condition: GOOD,
  price: 8
};

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should update non array fields correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          const { id, authors, description, images, condition, price, industryIdentifiers } = createdTextbook;
          const newTitle = chance.name();
          const newDescription = `${chance.name()} ${chance.name()}`;
          const newPrice = chance.floating({min: 0, max: 1000, fixed: 1})

          const fieldsToUpdate = {
            id,
            title: newTitle,
            authors,
            description: newDescription,
            images,
            condition: EXCELLENT,
            price: newPrice,
            industryIdentifiers,
          }

          return gql({
            query: UPDATE_TEXTBOOK,
            variables: {
              textbook: fieldsToUpdate
            }
          })
            .then((updated) => {
              expect(updated.title).toBe(newTitle);
              expect(updated.description).toBe(newDescription);
              expect(updated.condition).toBe(EXCELLENT);
              expect(updated.price).toBe(newPrice);
            });
        })
    })
    .then(() => done())
    .catch(done);
});

test("should update authors correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          const { id, title, description, images, condition, price, industryIdentifiers } = createdTextbook;
          const newAuthors = [chance.name(), chance.name()];
          const fieldsToUpdate = {
            id,
            title,
            authors: newAuthors,
            description,
            images,
            condition,
            price,
            industryIdentifiers,
          }

          return gql({
            query: UPDATE_TEXTBOOK,
            variables: {
              textbook: fieldsToUpdate
            }
          })
            .then((updated) => {
              expect(updated.authors).toEqual(newAuthors);
            });
        })
    })
    .then(() => done())
    .catch(done);
});

test("should update images correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          const { id, title, description, authors, condition, price, industryIdentifiers } = createdTextbook;
          const newImages = [
            {
              thumbnail: chance.url(),
            },
            {
              thumbnail: chance.url(),
            }
          ];
          const fieldsToUpdate = {
            id,
            title,
            authors,
            description,
            images: newImages,
            condition,
            price,
            industryIdentifiers,
          }

          return gql({
            query: UPDATE_TEXTBOOK,
            variables: {
              textbook: fieldsToUpdate
            }
          })
            .then((updated) => {
              expect(updated.images).toEqual(newImages);
            });
        })
    })
    .then(() => done())
    .catch(done);
});

test("should update industryIdentifiers correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          const { id, title, description, images, authors, condition, price, industryIdentifiers } = createdTextbook;
          const newIndustryIdentifiers = [
            {
              type: "ISBN13",
              identifier: "9783161484100"
            }
          ];
          const fieldsToUpdate = {
            id,
            title,
            authors,
            description,
            industryIdentifiers: newIndustryIdentifiers,
            images,
            condition,
            price,
          }

          return gql({
            query: UPDATE_TEXTBOOK,
            variables: {
              textbook: fieldsToUpdate
            }
          })
            .then((updated) => {
              expect(updated.industryIdentifiers).toEqual(newIndustryIdentifiers);
            });
        })
    })
    .then(() => done())
    .catch(done);
});
