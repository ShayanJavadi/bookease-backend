import { BIGINT, STRING } from "sequelize";

export default (db) => {
  const TextbookSale = db.define("TextbookSale", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
      type: STRING,
      required: true,
    },
    buyerId: {
      type: STRING,
      required: true,
    },
    sellerId: {
      type: STRING,
      required: true,
    },
  });

  const { models: { Textbook, User, BuyRequest } } = db;

  TextbookSale.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  Textbook.hasOne(TextbookSale, {
    as: "TextbookSale",
    foreignKey: "textbookSaleId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  TextbookSale.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  TextbookSale.hasOne(BuyRequest, {
    as: "BuyRequest",
    foreignKey: "BuyRequestId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookSale;
};
