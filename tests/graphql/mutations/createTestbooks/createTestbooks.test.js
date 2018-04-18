import Chance from "chance";
import faker from "faker";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import gql from "../../../libs/gql";
import CREATE_TEXTBOOK from "./createTextbook.graphql";
import UPDATE_PROFILE from "../updateProfile/updateProfile.graphql";
import {FAIR} from "../../../../src/db/models/Textbook/TextbookConditionConsts";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should created textbook correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(async (user) => {
      await gql({
        query: UPDATE_PROFILE,
        variables: {
          displayName: chance.name(),
          photoURL: faker.image.avatar(),
          schoolId: "227216",
        }
      })

      const textbooks = [
        {
          title: "Biochemistry",
          image: "https://i.imgur.com/Vw8GZz7.jpg"
        },
        {
          title: "Healthy Living",
          image: "https://i.imgur.com/0E6N84L.jpg"
        },
        {
          title: "Jazz",
          image: "https://i.imgur.com/hEdM5Lq.jpg"
        },
        {
          title: "Neuroanatomy through Clinical Cases",
          image: "https://i.imgur.com/LjjZkC5.jpg"
        },
        {
          title: "Managerial Economics",
          image: "https://i.imgur.com/aJshm3L.jpg"
        },
        {
          title: "Organic Chemistry",
          image: "https://i.imgur.com/nNy1gTk.jpg"
        },
      ];

      const promises = textbooks.reduce((createTextbookMutations, textbook) => {
        const textbookToCreate = {
          title: textbook.title,
          description: "Components built for iOS and Android Platform-specific look-and-feel with smooth animations and gestures.",
          industryIdentifiers: [
            {
              type: "ISBN10",
              identifier: "1848000707"
            }],
          authors: ["O Really"],
          images: [{
            thumbnail: textbook.image
          }],
          condition: FAIR,
          price: Math.floor(Math.random() * 99) + 1 ,
          edition: 1,
        };

        createTextbookMutations.push(gql({
          query: CREATE_TEXTBOOK,
          variables: {
            textbook: textbookToCreate
          }
        }))

        return createTextbookMutations;
      }, [])

      return Promise.all(promises);
    })
    .then(() => done())
    .catch(done);
});
