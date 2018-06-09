import {GraphQLID, GraphQLNonNull} from "graphql";
import TextbookType from "../types/Textbook";
import db from "../../db";

export default {
  type: TextbookType,
  description: "get one selling textbook",
  args: {
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => {
    const {models: {Textbook, Bookmark, BuyRequest}} = db;
    return Textbook.find({
      include: [
        {
          model: Bookmark,
          as: "Bookmarks",
          where: {textbookId: args.textbookId, userId: req.session.userId},
          required: false,
        },
        {
          model: BuyRequest,
          as: "BuyRequests",
          where: {textbookId: args.textbookId, userId: req.session.userId},
          required: false,
        },
      ],
      where: {
        id: args.textbookId,
      },
    });
  },
};
