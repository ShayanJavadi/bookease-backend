import { argv } from "yargs";
import fs from "fs-extra";
import extend from "lodash/extend";
import path from "path";
import pkg from "../../package.json";
import L from "../logger/logger";

const { buildNumber } = argv;

const { version } = pkg;

const parts = version.split(".");
parts.pop();
parts.push(buildNumber);

const newVersion = parts.join(".");

fs.outputJsonSync(path.resolve(__dirname, "../../package.json"), extend({}, pkg, { version: newVersion }), {
  spaces: 2,
});

L.info(`Version has been updated ${newVersion}.`);
