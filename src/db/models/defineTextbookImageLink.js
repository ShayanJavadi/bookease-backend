import {BIGINT, TEXT, STRING} from "sequelize";

export default (db) => {
  const TextbookImageLink = db.define("TextbookImageLink", {
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
  }, {
    indexes: [{
      unique: true,
      fields: ["textbookId", "userId"],
    }],
  });

  const {models: {Textbook, User}} = db;
  TextbookImageLink.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  TextbookImageLink.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookImageLink;
};
