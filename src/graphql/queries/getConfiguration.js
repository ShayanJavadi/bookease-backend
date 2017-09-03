import Configuration from "../types/Configuration";
import config from "../../../config.json";

export default {
  type: Configuration,
  resolve: () => config,
};
