import {GraphQLID, GraphQLInputObjectType, GraphQLString} from "graphql";

export default new GraphQLInputObjectType({
  name: "TextbookImageLinkInput",
  fields: {
    smallThumbnail: {
      type: GraphQLID,
    },
    thumbnail: {
      type: GraphQLString,
    },
  },
});
