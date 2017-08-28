import B from "bluebird";

export default (req, args, ...checkers) => {
  return B.reduce(checkers, (memo, checker) => {
    return memo || checker(req, args);
  }, true);
};
