import db from "../../db";
import BuyRequestType from "../types/BuyRequest";
import BuyRequestInput from "../inputs/BuyRequestInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import {BUY_REQUEST} from "../../db/models/Notification/NotificationTypeConsts";
import sendPushNotifications from "../../libs/sendPushNotifications";

export default {
  type: BuyRequestType,
  args: {
    buyRequest: {
      type: BuyRequestInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          BuyRequest,
          Notification,
        },
      } = db;

      const {textbookId, recipientId, message} = args.buyRequest;

      return Notification.create({
        userId: recipientId,
        senderId: req.session.userId,
        textbookId,
        message,
        isRead: false,
        type: BUY_REQUEST,
      })
        .then((notification) => BuyRequest.create({ // eslint-disable-line
          userId: req.session.userId,
          textbookId,
          recipientId,
          isAccepted: false,
          message,
          notificationId: notification.id,
        })
          .then((buyRequest) => {
            if (req.session.pushNotificationToken) {
              // TODO: handle sending data for routing
              // TODO: create message template for buy request
              sendPushNotifications([{
                to: req.session.pushNotificationToken,
                sound: "default",
                body: message,
              }]);
            }

            return buyRequest;
          }));
    }),
};
