import {GraphQLID, GraphQLNonNull} from "graphql";
import Sequelize from "sequelize";
import TextbookType from "../types/Textbook";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

console.log(Sequelize.Op, "<-- ");


export default {
  type: TextbookType,
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
          publishedAt: { [Sequelize.Op.ne]: null }
        },
      });
    }),
};
