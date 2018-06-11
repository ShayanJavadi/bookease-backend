import db from "../../connection";

export default ({ buyRequest }) => {
  const { models: { User } } = db;

  return User.findOne({
    where: {
      id: buyRequest.userId,
    },
  });
};
