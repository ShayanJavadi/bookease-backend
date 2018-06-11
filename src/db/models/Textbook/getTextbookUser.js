import db from "../../connection";

export default ({ textbook }) => {
  const { models: { User } } = db;

  return User.find({
    where: {
      id: textbook.userId,
    },
  });
};
