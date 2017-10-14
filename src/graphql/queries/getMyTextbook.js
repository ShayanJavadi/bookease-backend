import {GraphQLID, GraphQLNonNull} from "graphql";
import TextbookType from "../types/Textbook";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: TextbookType,
  description: "get one textbook of the current user",
  args: {
    textbookId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const { models: { Textbook } } = db;
      return Textbook.find({
        where: {
          id: args.textbookId,
          userId: req.session.userId,
        },
      });
    }),
};
