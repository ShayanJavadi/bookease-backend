import B from "bluebird";

export default (req, args, ...checkers) =>
  B.each(checkers, checker => B.resolve(checker(req, args)).then((valid) => {
    if (!valid) {
      throw new Error(`The request does not pass ${checker.name} rule!`, 403);
    }
    return valid;
  }));
