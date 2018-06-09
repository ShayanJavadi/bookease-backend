import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";
import Textbook from "./Textbook";
import db from "../../db";

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
    textbook: {
      type: new GraphQLNonNull(Textbook),
      resolve: bookmark => bookmark.textbook ||
      db.models.Textbook.findOne({
        where: {
          id: bookmark.textbookId,
        },
      }),
    },
  },
});
