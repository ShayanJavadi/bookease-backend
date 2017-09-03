import config from "../../config.json";

export default name => process.env[name] || config[name];
