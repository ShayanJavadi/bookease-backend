import fs from "fs";
import path from "path";
import reduce from "lodash/reduce";

export default ({ folderName }) => {
  const files = fs.readdirSync(path.join(__dirname, folderName));
  return reduce(files, (memo, file) => {
    const name = file.split(".").shift();
    memo[name] = require(`./${folderName}/${name}`).default; // eslint-disable-line
    return memo;
  }, {});
};
