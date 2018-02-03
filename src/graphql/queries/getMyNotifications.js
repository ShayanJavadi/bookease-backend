import {GraphQLInt, GraphQLList} from "graphql";
import NotificationType from "../types/Notification";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: new GraphQLList(NotificationType),
  description: "get one buy request",
  args: {
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Notification}} = db;
      const {limit = 10} = args;
      return Notification.findAll({
        where: {
          userId: req.session.userId,
        },
        limit,
      });
    }),
};
