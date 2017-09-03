import B from "bluebird";

export default (req, args, ...checkers) => B.reduce(checkers, (memo, checker) => memo || checker(req, args), true);
