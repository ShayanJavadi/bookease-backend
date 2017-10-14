import {BIGINT, TEXT, STRING, INTEGER} from "sequelize";

export default (db) => {
  const TextbookImage = db.define("TextbookImage", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
      type: STRING,
      required: true,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
    smallThumbnail: {
      type: TEXT,
    },
    thumbnail: {
      type: TEXT,
      required: true,
    },
    priority: {
      type: INTEGER,
      required: true,
    },
  });

  const {models: {Textbook, User}} = db;
  Textbook.hasMany(TextbookImage, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  TextbookImage.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookImage;
};
