import {BIGINT, STRING} from "sequelize";

export default (db) => {
  const TextbookImageLink = db.define("TextbookImageLink", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
      type: BIGINT,
      required: true,
    },
    smallThumbnail: {
      type: STRING,
    },
    thumbnail: {
      type: STRING,
      required: true,
    },
  });

  const {models: {Textbook}} = db;
  TextbookImageLink.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookImageLink;
};
