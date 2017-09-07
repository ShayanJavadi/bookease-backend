import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
  name: "TextbookIndustryIdentifier",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    identifier: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
});
