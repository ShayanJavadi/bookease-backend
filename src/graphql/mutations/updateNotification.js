import {reduce, isEmpty} from "lodash";
import db from "../../db";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import NotificationType from "../types/Notification";
import NotificationInput from "../inputs/NotificationInput";
import isValueEmpty from "../../libs/isValueEmpty";

export default {
  type: NotificationType,
  args: {
    notification: {
      type: NotificationInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          Notification,
        },
      } = db;

      const {notification} = args;

      return Notification.findOne({
        where: {
          id: notification.id,
        },
      })
        .then((notificationToUpdate) => {
          if (isEmpty(notificationToUpdate)) {
            throw new Error("The requested notification was not found!", 404);
          }

          return db.transaction((transaction) => {
            const values = reduce(notification, (result, value, key) => {
              if (!isValueEmpty(value)) {
                result[key] = value; // eslint-disable-line no-param-reassign
              }
              return result;
            }, {});

            return notificationToUpdate.update(values, {transaction});
          })
            .then(() => Notification.findOne({
              where: {
                id: notification.id,
              },
            }));
        });
    }),
};
