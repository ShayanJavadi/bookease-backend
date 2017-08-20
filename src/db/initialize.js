import defineModels from "./defineModels";

export default ({db, sync = false}) => db.authenticate().then(() => defineModels({db, sync}));
