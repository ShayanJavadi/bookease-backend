import Configuration from "../types/Configuration";
import pkg from "../../../package.json";

export default {
  type: Configuration,
  resolve: () => pkg,
};
