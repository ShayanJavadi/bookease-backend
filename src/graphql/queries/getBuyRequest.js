import { GraphQLID } from "graphql";
import BuyRequestType from "../types/BuyRequest";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: BuyRequestType,
  description: "get one buy request",
  args: {
    id: {
      type: GraphQLID,
    },
    notificationId: {
      type: GraphQLID,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const { models: { BuyRequest } } = db;
      const { id, notificationId } = args;

      if (notificationId) {
        return BuyRequest.find({
          where: {
            notificationId,
          },
        });
      }

      return BuyRequest.find({
        where: {
          id,
        },
      });
    }),
};
