import {BIGINT, STRING, BOOLEAN} from "sequelize";

export default (db) => {
  const BuyRequest = db.define("BuyRequest", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
      type: STRING,
      required: true,
    },
    notificationId: {
      type: STRING,
      required: true,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
    recipientId: {
      type: BIGINT,
      required: true,
    },
    isAccepted: {
      type: BOOLEAN,
      required: true,
      defaultValue: false,
    },
    isActive: {
      type: BOOLEAN,
      required: true,
      defaultValue: true,
    },
    isDeleted: {
      type: BOOLEAN,
      required: true,
      defaultValue: false,
    },
    message: {
      type: STRING,
      required: true,
    },
  });

  const {models: {User, Textbook}} = db;

  Textbook.hasMany(BuyRequest, {
    as: "BuyRequest",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  BuyRequest.belongsTo(User, {
    as: "BuyRequest",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return BuyRequest;
};
