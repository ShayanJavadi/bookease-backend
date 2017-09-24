import {GraphQLNonNull, GraphQLInputObjectType, GraphQLString} from "graphql";

export default new GraphQLInputObjectType({
  name: "TextbookIndustryIdentifierInput",
  fields: {
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    identifier: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
