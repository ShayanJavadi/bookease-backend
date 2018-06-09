import {GraphQLID, GraphQLNonNull} from "graphql";
import NotificationType from "../types/Notification";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: NotificationType,
  description: "Get one notification.",
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Notification}} = db;
      return Notification.findOne({
        where: {
          id: args.id,
        },
      })
        .then((notificiation) => {
          if (notificiation) {
            notificiation.session = req.session; // eslint-disable-line
          }

          return notificiation;
        });
    }),
};
