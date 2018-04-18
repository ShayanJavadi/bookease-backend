import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

export default new GraphQLObjectType({
  name: "Bookmark",
  fields: {
    id: {
      type: GraphQLString,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
