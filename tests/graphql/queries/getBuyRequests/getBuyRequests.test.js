import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signOut from "../../common/signOut";
import gql from "../../../libs/gql";
import CREATE_BUY_REQUEST from "../../mutations/createBuyRequest/createBuyRequest.graphql";
import UPDATE_BUY_REQUEST from "../../mutations/updateBuyRequest/updateBuyRequest.graphql";
import CREATE_TEXTBOOK from "../../mutations/createTextbook/createTextbook.graphql";
import GET_BUY_REQUESTS from "./getBuyRequests.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

  test("should get buy requests successfully", (done) => {
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
              const buyRequestFromUser2 = {
                textbookId: createdTextbook.id,
                recipientId: user1.id,
                message: "user2's request message",
              }

              return gql({
                query: CREATE_BUY_REQUEST,
                variables: {
                  buyRequest: buyRequestFromUser2
                }
              })
              .then(buyRequestCreatedByUser2 => {
                signOut()
                .then(() => {
                  registerAndSignInWithEmail({ email: email3 })
                  .then(user3 => {
                    const buyRequestFromUser3 = {
                      textbookId: createdTextbook.id,
                      recipientId: user1.id,
                      message: "user3's request message",
                    }

                    return gql({
                      query: CREATE_BUY_REQUEST,
                      variables: {
                        buyRequest: buyRequestFromUser3
                      }
                    })
                    .then(buyRequestCreatedByUser3 => {
                      return gql({
                        query: GET_BUY_REQUESTS,
                        variables: {
                          textbookId: createdTextbook.id,
                        }
                      })
                      .then(buyRequests => {
                        expect(buyRequests.length).toBe(2);
                        done()
                        .catch(done);
                      })
                    })
                  })
                })
              })
            })
          })
        });
      })
  });
