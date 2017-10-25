import Chance from "chance";
import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import registerAndSignInWithEmail from "../../common/registerAndSignInWithEmail";
import signInWithEmail from "../../common/signInWithEmail";
import gql from "../../../libs/gql";
import UPDATE_PROFILE from "./updateProfile.graphql";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should update email correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const newEmailAddress = chance.email();

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          email: newEmailAddress
        }
      })
        .then((updated) => {
          expect(updated.email).toBe(newEmailAddress);
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update phone number correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const phoneNumber = chance.phone();

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          phoneNumber
        }
      })
        .then((updated) => {
          expect(updated.phoneNumber).toBe(phoneNumber);
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update display name correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const displayName = chance.name();

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          displayName
        }
      })
        .then((updated) => {
          expect(updated.displayName).toBe(displayName);
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update password correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const password = chance.string();

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          password
        }
      })
        .then((updated) => {
          return signInWithEmail({ id: updated.id, email, password });
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update schoolId correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const { models: { School } } = db;
      return School.find({});
    })
    .then(school => {
      return gql({
        query: UPDATE_PROFILE,
        variables: {
          schoolId: school.id
        }
      })
        .then((updated) => {
          expect(updated.schoolId).toBe(school.id);
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update facebook info correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const facebook = {
        uid: chance.guid()
      };

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          facebook
        }
      })
        .then((updated) => {
          expect(updated.facebook.uid).toBe(facebook.uid);
        });
    })
    .then(() => done())
    .catch(done);
});

test("should update google info correctly", (done) => {
  const chance = new Chance();
  const email = chance.email();
  registerAndSignInWithEmail({ email })
    .then(() => {
      const google = {
        uid: chance.guid()
      };

      return gql({
        query: UPDATE_PROFILE,
        variables: {
          google
        }
      })
        .then((updated) => {
          expect(updated.google.uid).toBe(google.uid);
        });
    })
    .then(() => done())
    .catch(done);
});

