import Chance from "chance";
import {find} from "lodash";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signInWithEmail from "../../common/signInWithEmail";
import signOut from "../../common/signOut";
import gql from "../../../libs/gql";
import CREATE_BUY_REQUEST from "../../mutations/createBuyRequest/createBuyRequest.graphql";
import CREATE_TEXTBOOK from "../../mutations/createTextbook/createTextbook.graphql";
import GET_MY_NOTIFICATIONS from "./getMyNotifications.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should create buy request successfully", (done) => {
  const chance = new Chance();
  const email1 = chance.email();
  const email2 = chance.email();
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
              signOut()
              .then(() => {
                  signInWithEmail({ id: user1.id, email: email1, password: user1.verificationCode })
                  .then(signedInUser => {
                    return gql({
                      query: GET_MY_NOTIFICATIONS,
                      variables: {
                        limit: 10,
                      }
                    })
                    .then(notifications => {
                      notifications.map(notification => {
                        expect(notification.userId).toBe(user1.id);
                      })
                    })
                  })
                  .then(() => done())
                  .catch(done);
              })
            })
          })
        })
      });
    })
});
