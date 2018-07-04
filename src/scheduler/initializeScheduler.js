import L from "../logger/logger";

export default ({ scheduler }) => scheduler.start()
  .then(() => L.info("Scheduler has been initialized."))
  .catch(error => L.error(`Unable to initialize scheduler: ${error}`));
