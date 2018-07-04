import { BIGINT, STRING } from "sequelize";

export default (db) => {
  const TextbookAuthor = db.define("TextbookAuthor", {
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
    name: {
      type: STRING,
      required: true,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["textbookId", "userId", "name"],
    }],
  });

  const { models: { Textbook, User } } = db;
  TextbookAuthor.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  TextbookAuthor.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookAuthor;
};
