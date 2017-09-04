import basicAuth from "express-basic-auth";
import reduce from "lodash/reduce";
import isEmpty from "lodash/isEmpty";
import getVariable from "../config/getVariable";

export default (app) => {
  const credentials = getVariable("BASIC_AUTH_USERS").split(",");

  if (!isEmpty(credentials)) {
    app.use(basicAuth({
      users: reduce(credentials, (memo, credential) => {
        const [user, password] = credential.split(":");
        memo[user] = password;
        return memo;
      }, {}),
      challenge: true,
      realm: getVariable("BASIC_AUTH_REALM")
    }));
  }

  return app;
};
