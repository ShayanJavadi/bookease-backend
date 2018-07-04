import { BIGINT, STRING, BOOLEAN } from "sequelize";
import { NOTIFY } from "./Notification/NotificationTypeConsts";

export default (db) => {
  const { models: { User, Textbook, BuyRequest } } = db;
  const Notification = db.define("Notification", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: STRING,
      required: true,
    },
    isRead: {
      type: BOOLEAN,
      defaultValue: false,
      required: true,
    },
    type: {
      type: STRING,
      required: true,
      defaultValue: NOTIFY,
    },
    textbookId: {
      type: STRING,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
    senderId: {
      type: BIGINT,
      required: true,
    },
  });

  Notification.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  Notification.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  BuyRequest.hasMany(Notification, {
    as: "Notification",
    foreignKey: "notificationId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return Notification;
};
