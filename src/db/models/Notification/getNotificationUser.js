import db from "../../connection";

export default ({notification}) => {
  const {models: {User}} = db;
  return User.findOne({
    where: {
      id: notification.senderId,
    },
  })
    .then(user => user);
};
