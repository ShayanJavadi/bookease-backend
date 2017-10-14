import {GraphQLID, GraphQLNonNull} from "graphql";
import {Op} from "sequelize";
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
      const {models: {Textbook}} = db;
      return Textbook.find({
        where: {
          id: args.textbookId,
          publishedAt: {[Op.ne]: null},
        },
      });
    }),
};
