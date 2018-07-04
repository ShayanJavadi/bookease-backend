import db from "../../db";
import BuyRequestType from "../types/BuyRequest";
import BuyRequestInput from "../inputs/BuyRequestInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import { BUY_REQUEST } from "../../db/models/Notification/NotificationTypeConsts";
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
          User,
          Textbook,
        },
      } = db;

      const { textbookId, recipientId, message } = args.buyRequest;

      return Textbook.findOne({
        where: {
          id: textbookId,
        },
      })
        .then(textbook => User.findOne({
          where: {
            id: recipientId,
          },
        })
          .then(recipient => User.findOne({
            where: {
              id: req.session.userId,
            },
          })
            .then(sender => Notification.create({
              userId: recipientId,
              senderId: req.session.userId,
              textbookId,
              message,
              isRead: false,
              type: BUY_REQUEST,
            })
              .then((notification) => BuyRequest.create({ // eslint-disable-line
                userId: req.session.userId,
                userPhoneNumber: sender.phoneNumber,
                recipientPhoneNumber: recipient.phoneNumber,
                textbookId: textbook.id,
                recipientId,
                isAccepted: false,
                message,
                notificationId: notification.id,
              })
                .then((buyRequest) => {
                  if (recipient.pushNotificationToken) {
                    return sendPushNotifications([{
                      to: recipient.pushNotificationToken,
                      sound: "default",
                      title: `${sender.displayName} has requested to purchase ${textbook.title}`,
                      body: `${message.substring(0, 50)}...`,
                      data: {
                        notificationType: BUY_REQUEST,
                        title: `${sender.displayName} has requested to purchase ${textbook.title}`,
                        body: `${message.substring(0, 50)}...`,
                        notificationId: notification.id,
                      },
                    }]).then(() => buyRequest);
                  }

                  return buyRequest;
                })))));
    }),
};
