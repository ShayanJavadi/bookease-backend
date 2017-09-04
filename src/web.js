import express from "express";
import {json, urlencoded} from "body-parser";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import compression from "compression";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import {HTTPS} from "express-sslify";
import getVariable from "./config/getVariable";
import getPort from "./config/getPort";
import getHost from "./config/getHost";
import schema from "./graphql/schema";
import isDevelopment from "./config/isDevelopment";
import L from "./logger/logger";
import db from "./db";
import initializeDb from "./db/initialize";
import configureSession from "./libs/configureSession";
import configureCors from "./libs/configureCors";
import configureAuth from "./libs/configureAuth";

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

configureSession(app);
configureCors(app);
configureAuth(app);

app.use("/graphql", graphqlExpress(request => ({
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
      L.info(`Server is listening at ${HOST}:${PORT} allowing requests from ${getVariable("CORS_ALLOWED_ORIGINS")}`);
    });
  });

export default app;
