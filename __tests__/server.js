import web from "../src/web";

let server;

export const start = () => web.start()
  .then(runningServer => {
    server = runningServer;
  });

export const stop = () => server.close();