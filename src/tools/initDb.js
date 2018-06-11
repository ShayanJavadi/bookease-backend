import db from "../db";
import L from "../logger/logger";
import initializeDb from "../db/initialize";


initializeDb({ db, sync: true })
  .then(() => {
    L.info("Database structure has been initialized.");
    process.exit(0);
  })
  .catch((e) => {
    L.error(e);
    process.exit(e.code || e);
  });
