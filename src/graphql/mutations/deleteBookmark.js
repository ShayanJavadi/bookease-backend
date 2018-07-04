import { GraphQLInt } from "graphql";
import db from "../../db";
import BookmarkInput from "../inputs/BookmarkInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: GraphQLInt,
  args: {
    bookmark: {
      type: BookmarkInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          Bookmark,
        },
      } = db;

      const { textbookId } = args.bookmark;
      Bookmark.findOne({
        where: {
          userId: req.session.userId,
          textbookId,
        },
      })
        .then(bookmarkToDelete => bookmarkToDelete.destroy())
        .then(() => 200);
    }),
};
