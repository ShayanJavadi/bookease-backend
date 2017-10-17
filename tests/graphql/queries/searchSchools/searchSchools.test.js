import db from "../../../../src/db/index";
import initializeDb from "../../../../src/db/initialize";
import gql from "../../../libs/gql";
import SEARCH_SCHOOLS from "./searchSchools.graphql";

beforeAll((done) => initializeDb({ db })
  .then(() => done()));

test("should throw an error if no name is passed", (done) => {
  gql({
    query: SEARCH_SCHOOLS
  })
    .catch((error) => {
      expect(error).toBeTruthy();
    })
    .then(() => done())
});

test("should return UT Dallas with 'ut dallas'", (done) => {
  gql({
    query: SEARCH_SCHOOLS,
    variables: {
      name: "ut dallas"
    }
  })

    .then((schools) => {
      expect(schools).toHaveLength(1);
      const [school] = schools;
      expect(school.id).toBe("228787");
      expect(school.name).toBe("The University of Texas at Dallas");
      expect(school.address).toBe("800 West Campbell  Road, Richardson, Texas 75080");
      done();
    })
    .catch(done);
});

test("should return UT Dallas with 'Ut dallas'", (done) => {
  gql({
    query: SEARCH_SCHOOLS,
    variables: {
      name: "Ut dallas"
    }
  })

    .then((schools) => {
      expect(schools).toHaveLength(1);
      const [school] = schools;
      expect(school.id).toBe("228787");
      expect(school.name).toBe("The University of Texas at Dallas");
      expect(school.address).toBe("800 West Campbell  Road, Richardson, Texas 75080");
      done();
    })
    .catch(done);
});

test("should return list of schools matching 'alabama'", (done) => {
  gql({
    query: SEARCH_SCHOOLS,
    variables: {
      name: "alabama"
    }
  })

    .then((schools) => {
      expect(schools.length > 1).toBeTruthy();
      const [firstResult, secondResult] = schools;
      expect(firstResult.id).toBe("100751");
      expect(firstResult.name).toBe("The University of Alabama");
      expect(firstResult.address).toBe("739 University Blvd, Tuscaloosa, Alabama 35487");

      expect(secondResult.id).toBe("100663");
      expect(secondResult.name).toBe("University of Alabama at Birmingham");
      expect(secondResult.address).toBe("Administration Bldg Suite 1070, Birmingham, Alabama 35294");
      done();
    })
    .catch(done);
});
test("should return list of schools matching 'alabama' with limit", (done) => {
  gql({
    query: SEARCH_SCHOOLS,
    variables: {
      name: "alabama",
      limit: 2
    }
  })

    .then((schools) => {
      expect(schools.length).toBe(2);
      done();
    })
    .catch(done);
});