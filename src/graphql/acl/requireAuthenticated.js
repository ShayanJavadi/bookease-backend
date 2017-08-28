import isEmpty from "lodash/isEmpty";

export default req => !isEmpty(req.session.userId);
