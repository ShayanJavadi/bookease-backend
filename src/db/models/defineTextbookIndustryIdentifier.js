import {BIGINT, STRING} from "sequelize";

export default (db) => {
  const TextbookIndustryIdentifier = db.define("TextbookIndustryIdentifier", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    textbookId: {
      type: BIGINT,
      required: true,
    },
    type: {
      type: STRING,
      required: true,
    },
    identifier: {
      type: STRING,
      required: true,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["textbookId", "type"],
    }],
  });

  const {models: {Textbook}} = db;

  TextbookIndustryIdentifier.belongsTo(Textbook, {
    as: "Textbook",
    foreignKey: "textbookId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return TextbookIndustryIdentifier;
};
