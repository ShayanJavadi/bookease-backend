import { Logger, transports } from "winston";
import isDevelopment from "../config/isDevelopment";
import getVariable from "../config/getVariable";

const logger = new Logger({
  level: getVariable("LOG_LEVEL") || (isDevelopment() ? "info" : "warn"),
  transports: [
    new (transports.Console)(),
  ],
});

export default logger;
