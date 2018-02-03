import {GraphQLID, GraphQLNonNull} from "graphql";
import NotificationType from "../types/Notification";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: NotificationType,
  description: "get one buy request",
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Notification}} = db;
      return Notification.find({
        where: {
          id: args.id,
        },
      });
    }),
};
