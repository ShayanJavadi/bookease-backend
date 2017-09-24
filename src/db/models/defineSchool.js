import {BIGINT, STRING} from "sequelize";

export default db => db.define("School", {
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
});
