import {GraphQLInt, GraphQLList} from "graphql";
import B from "bluebird";
import {assign} from "lodash";
import NotificationType from "../types/Notification";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";
import {BUY_REQUEST} from "../../db/models/Notification/NotificationTypeConsts";

export default {
  type: new GraphQLList(NotificationType),
  description: "Get the user's notifications.",
  args: {
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Notification, BuyRequest}} = db;
      const {limit = 10} = args;
      return Notification.findAll({
        where: {
          userId: req.session.userId,
        },
        limit,
      })
        .then(async (notifications) => {
          const notificationCollection = await B.reduce(notifications, async (previousPromise, notification) => { // eslint-disable-line max-len
            const currentPromise = await previousPromise;

            if (notification.type === BUY_REQUEST) {
              const fetchedBuyRequest = await BuyRequest.findOne({
                where: {
                  notificationId: notification.id,
                },
              });

              const notificationWithBuyRequest = assign(
                notification,
                {buyRequest: fetchedBuyRequest},
              );

              currentPromise.push(notificationWithBuyRequest);
            }

            return currentPromise;
          }, B.all([]));

          return notificationCollection;
        });
    }),
};
