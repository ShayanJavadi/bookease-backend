import express from "express";
import {json, urlencoded} from "body-parser";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import compression from "compression";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import {HTTPS} from "express-sslify";
import session from "express-session";
import redis from "connect-redis";
import cors from "cors";
import getVariable from "./config/getVariable";
import getAppVersion from "./config/getAppVersion";
import getPort from "./config/getPort";
import getHost from "./config/getHost";
import schema from "./graphql/schema";
import isDevelopment from "./config/isDevelopment";
import L from "./logger/logger";
import db from "./db";
import initializeDb from "./db/initialize";

const SessionStore = redis(session);
const store = new SessionStore({
  url: getVariable("REDIS_URL"),
});

const isDev = isDevelopment();

const app = express();

if (!isDev) {
  app.use(HTTPS({
    trustProtoHeader: true,
  }));
}

app.use(compression());
app.use(json({
  limit: getVariable("BODY_PARSER_LIMIT"),
}));
app.use(urlencoded({extended: true}));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cookieParser());
app.disable("etag");

const sessionOptions = {
  store,
  name: [getAppVersion(), "sid"].join("."),
  secret: getVariable("SESSION_SECRET"),
  saveUninitialized: false,
  resave: true,
  cookie: {
    httpOnly: true,
    maxAge: getVariable("SESSION_MAX_AGE"),
  },
};

if (!isDev) {
  app.set("trust proxy", 1);
  sessionOptions.cookie.secure = true;
}

const whitelist = getVariable("CORS_ALLOWED_ORIGINS").split(',');
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(session(sessionOptions));
app.use("/graphql", cors(corsOptions), graphqlExpress(request => ({
  schema,
  rootValue: {
    session: request.session,
    request,
  },
})));

app.get("/graphiql", graphiqlExpress({
  endpointURL: "/graphql",
  pretty: true,
}));


app.start = () => initializeDb({db})
.then(() => {
  const PORT = getPort();
  const HOST = getHost();

  app.listen(PORT, HOST, () => {
    L.info(`Server is listening at ${HOST}:${PORT} allowing requests from ${whitelist.join(' OR ')}`);
  });
});

export default app;
