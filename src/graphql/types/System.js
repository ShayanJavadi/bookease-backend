import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
  name: "System",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
