import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signOut from "../../common/signOut";
import gql from "../../../libs/gql";
import CREATE_BUY_REQUEST from "../createBuyRequest/createBuyRequest.graphql";
import UPDATE_BUY_REQUEST from "./updateBuyRequest.graphql";
import CREATE_TEXTBOOK from "../createTextbook/createTextbook.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

  test("should update buy request successfully", (done) => {
    const chance = new Chance();
    const email1 = chance.email();
    const email2 = chance.email();
    const {models: {BuyRequest}} = db;

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
                message: "test buy request message",
              }

              return gql({
                query: CREATE_BUY_REQUEST,
                variables: {
                  buyRequest
                }
              })
              .then(createdBuyRequest => {
                const updatedValues = {
                  id: createdBuyRequest.id,
                  textbookId: createdTextbook.id,
                  recipientId: user1.id,
                  message: "updated buy request",
                }

                return gql({
                  query: UPDATE_BUY_REQUEST,
                  variables: {
                    buyRequest: updatedValues,
                  }
                })
                .then(() => {
                  BuyRequest.findOne({
                    where: {
                      id: createdBuyRequest.id,
                    }
                  })
                  .then((updatedBuyRequest) => {
                    expect(updatedBuyRequest.message).toBe(updatedValues.message);
                    done()
                    .catch(done);
                  })
                })
              })
            })
          })
        });
      })
  });
