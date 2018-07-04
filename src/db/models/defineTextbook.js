import { BIGINT, DATE, DECIMAL, INTEGER, STRING, BOOLEAN } from "sequelize";
import { GOOD } from "./Textbook/TextbookConditionConsts";

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
    schoolId: {
      type: BIGINT,
      required: true,
    },
    publishedAt: {
      type: DATE,
    },
    condition: {
      type: INTEGER,
      required: true,
      defaultValue: GOOD,
    },
    price: {
      type: DECIMAL(10, 2),
      required: true,
      defaultValue: 0,
    },
    isArchived: {
      type: BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: BOOLEAN,
      defaultValue: false,
    },
    isSold: {
      type: BOOLEAN,
      defaultValue: false,
    },
    bookmarkCount: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  const { models: { User } } = db;

  Textbook.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
    targetKey: "id",
  });

  return Textbook;
};
