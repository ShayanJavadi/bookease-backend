import getNumberOfThreads from "./config/getNumberOfThreads";
import isDevelopment from "./config/isDevelopment";
import web from "./web";

if (isDevelopment()) {
  web.start();
} else {
  require("throng")({ // eslint-disable-line global-require
    workers: getNumberOfThreads(),
    lifetime: Infinity,
    start: () => web.start(),
  });
}
