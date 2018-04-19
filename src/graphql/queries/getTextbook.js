import {GraphQLID, GraphQLNonNull} from "graphql";
import TextbookType from "../types/Textbook";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: TextbookType,
  description: "get one selling textbook",
  args: {
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Textbook, Bookmark}} = db;
      return Textbook.find({
        include: [{
          model: Bookmark,
          as: "Bookmarks",
          where: {textbookId: args.textbookId, userId: req.session.userId},
          required: false,
        }],
        where: {
          id: args.textbookId,
        },
      });
    }),
};
