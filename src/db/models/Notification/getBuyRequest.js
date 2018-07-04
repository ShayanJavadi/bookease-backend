import db from "../../connection";

export default ({ notification }) => {
  const { session } = notification;
  const { models: { BuyRequest } } = db;

  return BuyRequest.findOne({
    where: {
      notificationId: notification.id,
    },
  })
    .then((buyRequest) => {
      if (buyRequest) {
        const currentUser = session ? session.userId : undefined;
        const buyRequestOwnerUserId = buyRequest ? buyRequest.userId : undefined;
        const isUserRequester = currentUser === buyRequestOwnerUserId;
        buyRequest.isUserRequester = isUserRequester; // eslint-disable-line
      }
      return buyRequest;
    });
};
