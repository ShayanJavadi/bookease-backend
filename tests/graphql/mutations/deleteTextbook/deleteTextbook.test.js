import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signInWithEmail from "../../common/signInWithEmail";
import gql from "../../../libs/gql";
import DELETE_TEXTBOOK from "./deleteTextbook.graphql";
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

test("Should delete textbook correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  const {models: {Textbook}} = db;

  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          console.log("\n\n\n");
          console.log(createdTextbook);
          console.log("\n\n\n");
          return gql({
            query: DELETE_TEXTBOOK,
            variables: {
              id: createdTextbook.id
            }
          })
          .then(() => {
            Textbook.findOne({
              where: {
                id: createdTextbook.id,
              }
            })
            .then((textbook) => {
              expect(textbook).toBeNull();
            })
          });
        })
    })
    .then(() => done())
    .catch(done);
});

test("Should delete textbook authors correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  const {models: {TextbookAuthor}} = db;

  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          return gql({
            query: DELETE_TEXTBOOK,
            variables: {
              id: createdTextbook.id
            }
          })
          .then(() => {
            TextbookAuthor.findOne({
              where: {
                textbookId: createdTextbook.id,
              }
            })
            .then((textbookAuthors) => {
              expect(textbookAuthors).toBeNull();
            })
          });
        })
    })
    .then(() => done())
    .catch(done);
});

test("Should delete textbook images correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  const {models: {TextbookImage}} = db;

  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          return gql({
            query: DELETE_TEXTBOOK,
            variables: {
              id: createdTextbook.id
            }
          })
          .then(() => {
            TextbookImage.findOne({
              where: {
                textbookId: createdTextbook.id,
              }
            })
            .then((textbookImages) => {
              expect(textbookImages).toBeNull();
            })
          });
        })
    })
    .then(() => done())
    .catch(done);
});

test("Should delete textbook industry identifiers correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  const {models: {TextbookIndustryIdentifier}} = db;

  registerAndSignInWithEmail({ email })
    .then(() => {
      return gql({
        query: CREATE_TEXTBOOK,
        variables: {
          textbook
        }
      })
        .then((createdTextbook) => {
          return gql({
            query: DELETE_TEXTBOOK,
            variables: {
              id: createdTextbook.id
            }
          })
          .then(() => {
            TextbookIndustryIdentifier.findOne({
              where: {
                textbookId: createdTextbook.id,
              }
            })
            .then((textbookIndustryIdentifiers) => {
              expect(textbookIndustryIdentifiers).toBeNull();
            })
          });
        })
    })
    .then(() => done())
    .catch(done);
});
