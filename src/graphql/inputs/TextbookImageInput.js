import { GraphQLID, GraphQLInputObjectType, GraphQLString, GraphQLInt } from "graphql";

export default new GraphQLInputObjectType({
  name: "TextbookImageInput",
  fields: {
    smallThumbnail: {
      type: GraphQLID,
    },
    thumbnail: {
      type: GraphQLString,
    },
    priority: {
      type: GraphQLInt,
    },
  },
});
