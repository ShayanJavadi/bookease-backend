import {GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
  name: "TextbookImageLink",
  fields: {
    smallThumbnail: {
      type: GraphQLString,
    },
    thumbnail: {
      type: GraphQLString,
    },
  },
});
