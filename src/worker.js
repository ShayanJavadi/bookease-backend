import L from "./logger/logger";
import scheduler from "./scheduler";
import subscribeToNotifyInterestedBuyers from "./scheduler/jobs/notifyInterestedBuyer/subscribe";

scheduler.connect()
  .then(() => {
    L.info("scheduler has connected.");
    subscribeToNotifyInterestedBuyers();
  });
