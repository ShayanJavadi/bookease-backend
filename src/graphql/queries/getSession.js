import pick from "lodash/pick";
import SessionType from "../types/Session";

export default {
  type: SessionType,
  description: "get the current session",
  resolve: (req) => {
    return pick(req.session, "userId");
  },
};

