import db from "../../connection";

export default ({ textbook }) => {
  const { models: { User } } = db;

  return User.findAll({
    where: {
      id: textbook.userId,
    },
  })
    .then(user => user.schoolId);
};
