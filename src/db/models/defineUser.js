import { BIGINT, BOOLEAN, STRING, TEXT } from "sequelize";

export default (db) => {
  const { models: { School } } = db;

  const User = db.define("User", {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: {
      type: STRING,
    },
    email: {
      type: STRING,
      unique: true,
    },
    photoURL: {
      type: STRING,
    },
    uid: {
      type: STRING,
    },
    phoneNumber: {
      type: STRING,
      unique: true,
    },
    refreshToken: {
      type: TEXT,
    },
    accessToken: {
      type: TEXT,
    },
    schoolId: {
      type: BIGINT,
      required: true,
    },
    verificationCode: {
      type: TEXT,
    },
    isVerified: {
      type: BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: TEXT,
    },
    pushNotificationToken: {
      type: TEXT,
    },
  });

  User.belongsTo(School, {
    as: "School",
    foreignKey: "schoolId",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  });

  return User;
};
