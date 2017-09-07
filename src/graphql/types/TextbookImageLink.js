import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";

export default new GraphQLObjectType({
  name: "TextbookImageLink",
  fields: {
    smallThumbnail: {
      type: GraphQLID,
    },
    thumbnail: {
      type: GraphQLString,
    }
  },
});
