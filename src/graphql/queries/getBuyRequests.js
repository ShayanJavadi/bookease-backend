import { GraphQLID, GraphQLList } from "graphql";
import BuyRequestType from "../types/BuyRequest";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: new GraphQLList(BuyRequestType),
  description: "get multiple buy requests",
  args: {
    textbookId: {
      type: GraphQLID,
    },
    recipientId: {
      type: GraphQLID,
    },

  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const { models: { BuyRequest } } = db;
      const { textbookId, recipientId } = args;

      if (recipientId) {
        return BuyRequest.findAll({
          where: {
            recipientId,
            isActive: true,
          },
        });
      }

      return BuyRequest.findAll({
        where: {
          textbookId,
        },
      });
    }),
};
