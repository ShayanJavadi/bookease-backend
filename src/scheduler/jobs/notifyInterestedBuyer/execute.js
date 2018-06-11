export default (job) => {
  const { data: { textbookId } } = job;

  console.log(`TODO: notify all buys interested in textbookId`);

  return job.done();
};
