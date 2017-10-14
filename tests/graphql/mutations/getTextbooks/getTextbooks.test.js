import Chance from "chance";
import Promise from "bluebird";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import gql from "../../../libs/gql";
import CREATE_TEXTBOOK from "../createTextbook/createTextbook.graphql";
import GET_MY_TEXTBOOKS from "./getTextbooks.graphql";

const textbookWithISBN10 = {
  title: "Algorithm with ISBN10",
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

const textbookWithISBN13 = {
  title: "Algorithm with ISBN13",
  description: "Book for sale ISBN13",
  industryIdentifiers: [
    {
      type: "ISBN10",
      identifier: "1848000707432"
    }],
  authors: ["Joe Doe"],
  images: [{
    thumbnail: "https://abc/def"
  }]
};

const textbooks = [textbookWithISBN10, textbookWithISBN13];
const chance = new Chance();
const email = chance.email();

beforeAll((done) => initializeDb({ db })
  .then(() => {
    return registerAndSignInWithEmail({ email });
  })
  .then(() => Promise.each(textbooks, (textbook) => gql({
    query: CREATE_TEXTBOOK,
    variables: {
      textbook
    }
  })))
  .then(() => done()));

test("should return 0 textbook with no query", (done) => {
  gql({
    query: GET_MY_TEXTBOOKS
  })
    .then((returnedTextbooks) => {
      expect(returnedTextbooks).toHaveLength(0);
    })
    .then(() => done())
    .catch(done);
});

test("should return 0 textbook with query as a string", (done) => {
  gql({
    query: GET_MY_TEXTBOOKS,
    variables: {
      query: "ISBN13"
    }
  })
    .then((returnedTextbooks) => {
      expect(returnedTextbooks).toHaveLength(0);
    })
    .then(() => done())
    .catch(done);
});

test("should return 0 textbook with query as a ISBN", (done) => {
  gql({
    query: GET_MY_TEXTBOOKS,
    variables: {
      query: textbookWithISBN10.industryIdentifiers[0].identifier
    }
  })
    .then((returnedTextbooks) => {
      expect(returnedTextbooks).toHaveLength(0);
    })
    .then(() => done())
    .catch(done);
});

test("should return 0 textbook with limit and offset", (done) => {
  gql({
    query: GET_MY_TEXTBOOKS,
    variables: {
      limit: 1,
      offset: 1
    }
  })
    .then((returnedTextbooks) => {
      expect(returnedTextbooks).toHaveLength(0);
    })
    .then(() => done())
    .catch(done);
});
