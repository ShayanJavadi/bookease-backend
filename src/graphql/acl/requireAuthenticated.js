import isEmpty from "lodash/isEmpty";

export default function requireAuthenticated(req) {
  return !isEmpty(req.session.userId);
}
