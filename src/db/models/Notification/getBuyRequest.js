import db from "../../connection";

export default ({notification}) => {
  const {models: {BuyRequest}} = db;

  return BuyRequest.findOne({
    where: {
      notificationId: notification.id,
    },
  });
};
