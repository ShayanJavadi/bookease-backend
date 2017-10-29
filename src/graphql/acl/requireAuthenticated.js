// import isEmpty from "lodash/isEmpty";

export default function requireAuthenticated(/* req */) {
  return true;
  // return !isEmpty(req.session.userId);
}
