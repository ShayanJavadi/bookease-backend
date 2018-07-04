import scheduler from "../../index";
import L from "../../../logger/logger";
import { JOB_NAME } from "./const";
import execute from "./execute";

export default () => scheduler.subscribe(JOB_NAME, {}, execute)
  .then(() => L.info(`subscribed to ${JOB_NAME}`));
