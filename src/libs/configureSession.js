import session from "express-session";
import redis from "connect-redis";
import getVariable from "../config/getVariable";
import getAppVersion from "../config/getAppVersion";
import isDevelopment from "../config/isDevelopment";

export default (app) => {
  const SessionStore = redis(session);
  const store = new SessionStore({
    url: getVariable("REDIS_URL"),
  });

  const sessionOptions = {
    store,
    name: [getAppVersion(), "sid"].join("."),
    secret: getVariable("SESSION_SECRET"),
    saveUninitialized: false,
    resave: true,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(getVariable("SESSION_MAX_AGE"), 10),
    },
  };

  if (!isDevelopment()) {
    app.set("trust proxy", 1);
    sessionOptions.cookie.secure = true;
  }

  app.use(session(sessionOptions));
  return app;
};
