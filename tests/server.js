import web from "../src/web";

export const start = (done) => web.start()
  .then(done)
  .catch(done);

export const stop = (done) => web.close(done);