import {config} from "../../package.json";

export default name => process.env[name] || config[name];
