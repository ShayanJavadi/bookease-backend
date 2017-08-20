import {readdirSync} from "fs";
import path from "path";
import reduce from "lodash/reduce";
import forEach from "lodash/forEach";

const files = readdirSync(path.join(__dirname, "models"));
const models = reduce(files, (memo, file) => {
  const name = file.split(".").shift();
  memo[name] = require(`./models/${name}`).default; // eslint-disable-line
  return memo;
}, {});

export default ({db, sync = false}) => {
  db.models = reduce(models, (memo, attributes, name) => { // eslint-disable-line
    memo[name] = db.define(name, attributes); // eslint-disable-line
    return memo;
  }, {});

  if (sync) {
    forEach(db.models, model => model.sync({force: true}));
  }

  return db;
};

