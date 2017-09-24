import {BIGINT, STRING} from "sequelize";

export default (db) => {
  const TextbookAuthor = db.define("TextbookAuthor", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
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
      fields: ["textbookId", "name"],
    }],
  });

  const {models: {Textbook}} = db;
  TextbookAuthor.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookAuthor;
};
