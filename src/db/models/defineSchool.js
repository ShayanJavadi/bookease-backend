import {STRING} from "sequelize";

export default db => db.define("School", {
  id: {
    type: STRING,
    primaryKey: true,
  },
  name: {
    type: STRING,
  },
  address: {
    type: STRING,
  },
});
