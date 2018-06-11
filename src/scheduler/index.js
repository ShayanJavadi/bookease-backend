import PgBoss from "pg-boss";
import getVariable from "../config/getVariable";

export default new PgBoss(`${getVariable("DATABASE_URL")}?ssl=require`);
