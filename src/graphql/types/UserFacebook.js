import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
  name: "UserFacebook",
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    uid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
