import request from "request-promise";
import extend from "lodash/extend";
import getPort from "../../src/config/getPort";
import getHost from "../../src/config/getHost";
import getVariable from "../../src/config/getVariable";

export default (options) => request(extend({
  method: "POST",
  baseUrl: `http://${getHost()}:${getPort()}`,
  uri: "/graphql",
  resolveWithFullResponse: true,
  headers: {
    authorization: `Basic ${Buffer.from(getVariable("BASIC_AUTH_USERS")).toString('base64')}`
  }
}, options));
