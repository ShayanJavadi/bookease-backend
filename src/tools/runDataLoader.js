import db from "../db";
import initializeDb from "../db/initialize";
import runDataLoader from "../db/runDataLoader";

initializeDb({db})
  .then(() => runDataLoader(db.models))
  .then(() => {
    console.log("Database has been reloaded.");
    process.exit(0);
  })
  .catch(e => process.exit(e.code || e));
