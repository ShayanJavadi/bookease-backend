import L from "../../../logger/logger";

export default (job) => {
  const { data: { textbookId } } = job;

  L.info(`TODO: notify all buys interested in ${textbookId}`);

  return job.done();
};
