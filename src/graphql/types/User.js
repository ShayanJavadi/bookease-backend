import isEmpty from "lodash/isEmpty";
import {GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import School from "./School";

export default new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLID,
    },
    displayName: {
      type: GraphQLString,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    photoURL: {
      type: GraphQLString,
    },
    uid: {
      type: GraphQLID,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    refreshToken: {
      type: GraphQLString,
    },
    accessToken: {
      type: GraphQLString,
    },
    setupCompleted: {
      type: GraphQLBoolean,
      resolve: source => !isEmpty(source.schoolId),
    },
    schoolId: {
      type: GraphQLID,
    },
    school: {
      type: School,
      resolve: source => source.getSchool(),
    },
  },
});
