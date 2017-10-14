import {GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";

export default new GraphQLObjectType({
  name: "TextbookImage",
  fields: {
    smallThumbnail: {
      type: GraphQLString,
    },
    thumbnail: {
      type: GraphQLString,
    },
    priority: {
      type: GraphQLInt,
    },
  },
});
