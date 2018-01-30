import db from "../../db";
import BuyRequestType from "../types/BuyRequest";
import BuyRequestInput from "../inputs/BuyRequestInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: BuyRequestType,
  args: {
    buyRequest: {
      type: BuyRequestInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          BuyRequest,
        },
      } = db;

      const {textbookId, recipientId, message} = args.buyRequest;
      return db.transaction(transaction => BuyRequest.create({ // eslint-disable-line
        userId: req.session.userId,
        textbookId,
        recipientId,
        isAccepted: false,
        message,
      })
        .then(buyRequest => buyRequest));
    }),
};
