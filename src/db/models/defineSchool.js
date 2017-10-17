import {BIGINT, STRING, INTEGER} from "sequelize";

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
  terms: {
    type: STRING(1000),
  },
  enrollmentCount: {
    type: INTEGER,
    defaultValue: 0
  }
});
