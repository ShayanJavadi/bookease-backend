import db from "../../connection";

export default ({ user }) => {
  const { models: { UserGoogle } } = db;

  return UserGoogle.find({
    where: {
      userId: user.id,
    },
  });
};
