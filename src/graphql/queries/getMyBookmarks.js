import {GraphQLInt, GraphQLList} from "graphql";
import BookmarkType from "../types/Bookmark";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: new GraphQLList(BookmarkType),
  description: "get all of user's bookmarks",
  args: {
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Bookmark}} = db;
      return Bookmark.findAll({
        where: {
          userId: req.session.userId,
        },
      });
    }),
};
