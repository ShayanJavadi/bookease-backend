import scheduler from "../../index";
import { JOB_NAME, START_IN } from "./const";
import L from "../../../logger/logger";

export default ({ textbook }) => scheduler.publish(JOB_NAME, { textbookId: textbook.id }, {
  startIn: START_IN,
})
  .then(jobId => L.info(`Job: ${jobId} has been created for topic: ${JOB_NAME}.`))
  .catch(publishError => L.error(`Publishing ${JOB_NAME} failed: ${publishError}`));
