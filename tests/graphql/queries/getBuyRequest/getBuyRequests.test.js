import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signOut from "../../common/signOut";
import gql from "../../../libs/gql";
import CREATE_BUY_REQUEST from "../../mutations/createBuyRequest/createBuyRequest.graphql";
import UPDATE_BUY_REQUEST from "../../mutations/updateBuyRequest/updateBuyRequest.graphql";
import CREATE_TEXTBOOK from "../../mutations/createTextbook/createTextbook.graphql";
import GET_BUY_REQUEST from "./getBuyRequest.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

  test("should get request successfully", (done) => {
    const chance = new Chance();
    const email1 = chance.email();
    const email2 = chance.email();
    const email3 = chance.email();
    registerAndSignInWithEmail({ email: email1 })
      .then(user1 => {
        const textbook = {
          title: "math apple",
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
          signOut()
          .then(() => {
            registerAndSignInWithEmail({ email: email2 })
            .then(user2 => {
              const buyRequest = {
                textbookId: createdTextbook.id,
                recipientId: user1.id,
                message: "request message",
              }

              return gql({
                query: CREATE_BUY_REQUEST,
                variables: {
                  buyRequest,
                }
              })
              .then(createdBuyRequest => {
                return gql({
                  query: GET_BUY_REQUEST,
                  variables: {
                    id: createdBuyRequest.id
                  }
                })
                .then(queryResult => {
                  expect(queryResult.id).toBe(createdBuyRequest.id);
                  done()
                  .catch(done);
                })
              })
            })
          })
        });
      })
  });
