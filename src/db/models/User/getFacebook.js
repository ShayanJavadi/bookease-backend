import db from "../../connection";

export default ({ user }) => {
  const { models: { UserFacebook } } = db;

  return UserFacebook.find({
    where: {
      userId: user.id,
    },
  });
};
