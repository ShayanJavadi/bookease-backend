import { BIGINT, STRING } from "sequelize";

export default (db) => {
  const { models: { User } } = db;

  const UserFacebook = db.define("UserFacebook", {
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

  UserFacebook.belongsTo(User, {
    as: "UserFacebook",
    foreignKey: "userId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return UserFacebook;
};
