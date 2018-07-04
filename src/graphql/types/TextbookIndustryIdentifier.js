import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "TextbookIndustryIdentifier",
  fields: {
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    identifier: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
