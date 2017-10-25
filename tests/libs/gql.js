import request from "request-promise";
import first from "lodash/first";
import keys from "lodash/keys";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import getPort from "../../src/config/getPort";
import getHost from "../../src/config/getHost";
import getVariable from "../../src/config/getVariable";

let cookieJar = request.jar();

export default ({ query, variables, returnFirstKey = true, jar }) => {
  const body = {
    query,
    variables
  };

  // console.log("query", query, "variables", variables);
  // console.log("variables", variables);

  // request.debug = true;
  return request({
    method: "POST",
    baseUrl: `http://${getHost()}:${getPort()}`,
    uri: "/graphql",
    resolveWithFullResponse: true,
    json: true,
    headers: {
      authorization: `Basic ${Buffer.from(getVariable("BASIC_AUTH_USERS")).toString("base64")}`
    },
    body,
    jar: jar || cookieJar
  })
    .then(({ body }) => {

      if (!isEmpty(body.errors)) {
        throw new Error(first(body.errors).message);
      }

      return returnFirstKey ? get(body.data, first(keys(body.data))) : body;
    });
};

