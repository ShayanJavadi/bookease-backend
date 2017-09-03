import {GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString} from "graphql";

export default new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    id: {
      type: GraphQLID,
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
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
    schoolId: {
      type: GraphQLID,
    },
  },
});
