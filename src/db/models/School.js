import {BIGINT, STRING} from "sequelize";

export default {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
  },
  address: {
    type: STRING,
  },
};
