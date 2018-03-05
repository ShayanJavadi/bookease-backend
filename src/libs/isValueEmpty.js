import {isEqual} from "lodash";

export default value => ((isEqual(value, {}) || isEqual(value, []) || isEqual(value, "")) || isEqual(value, undefined));
