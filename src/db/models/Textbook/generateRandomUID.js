import Chance from "chance";

export default () => new Chance().hash({ length: 12 });
