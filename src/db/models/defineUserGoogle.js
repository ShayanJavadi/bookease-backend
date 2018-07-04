import { BIGINT, STRING } from "sequelize";

export default (db) => {
  const { models: { User } } = db;

  const UserGoogle = db.define("UserGoogle", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: BIGINT,
      required: true,
    },
    uid: {
      type: STRING,
      required: true,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["uid", "userId"],
    }],
  });

  UserGoogle.belongsTo(User, {
    as: "UserGoogle",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return UserGoogle;
};
