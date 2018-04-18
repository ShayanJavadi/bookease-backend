import db from "../../db";
import BookmarkType from "../types/Bookmark";
import BookmarkInput from "../inputs/BookmarkInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: BookmarkType,
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

      const {textbookId} = args.bookmark;

      return Bookmark.create({
        userId: req.session.userId,
        textbookId,
      });
    }),
};
