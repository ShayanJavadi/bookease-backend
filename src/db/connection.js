import pg from "pg";
import Sequelize from "sequelize";
import S from "underscore.string";
import getVariable from "../config/getVariable";

if (S.toBoolean(getVariable("CONNECT_DATABASE_USING_SSL"))) {
  pg.defaults.ssl = true;
}

const sequelize = new Sequelize(getVariable("DATABASE_URL"), {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
