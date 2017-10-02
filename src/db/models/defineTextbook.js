import {BIGINT, STRING} from "sequelize";

export default (db) => {
  const Textbook = db.define("Textbook", {
    id: {
      type: STRING,
      primaryKey: true,
    },
    title: {
      type: STRING,
      required: true,
    },
    uid: {
      type: STRING,
      required: true,
      unique: true,
    },
    description: {
      type: STRING,
    },
    edition: {
      type: STRING,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
  });

  const {models: {User}} = db;

  Textbook.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
  });

  return Textbook;
};
