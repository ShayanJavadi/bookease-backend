import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "UserGoogle",
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    uid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
