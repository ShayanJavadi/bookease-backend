import isEmpty from "lodash/isEmpty";

export default (req, res, next) => {
  if (isEmpty(req.session.userId)) {
    res.status(401);
    return next(new Error("Authentication required!", 403));
  }

  return next();
};
