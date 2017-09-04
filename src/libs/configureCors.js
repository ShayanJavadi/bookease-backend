import cors from "cors";
import isEmpty from "lodash/isEmpty";
import getVariable from "../config/getVariable";
import L from "../logger/logger";

export default (app) => {
  const whitelist = getVariable("CORS_ALLOWED_ORIGINS").split(",");
  const corsOptions = {
    credentials: true
  };

  if (!isEmpty(whitelist)) {
    corsOptions.origin = (origin, callback) => {
      L.info(`origin: ${origin}, whitelist: ${whitelist.join(',')}`);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    };
  }

  app.use(cors(corsOptions));
  return app;
};
