import SystemType from "../types/System";
import pkg from "../../../package.json";

export default {
  type: SystemType,
  resolve: () => pkg,
};
