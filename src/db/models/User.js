import {BIGINT, STRING, TEXT} from "sequelize";

export default {
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
  },
  photoURL: {
    type: STRING,
  },
  uid: {
    type: STRING,
  },
  phoneNumber: {
    type: STRING,
  },
  refreshToken: {
    type: TEXT,
  },
  accessToken: {
    type: TEXT,
  },
};
