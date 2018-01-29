import extend from "lodash/extend";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import BuyRequestType from "../types/BuyRequest";
import BuyRequestInput from "../inputs/BuyRequestInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import generateRandomUID from "../../db/models/Textbook/generateRandomUID";

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

      const {textbookId, recipientId} = args.buyRequest;
      return db.transaction(transaction => BuyRequest.create(extend({
          userId: req.session.userId,
          textbookId: textbookId,
          recipientId: recipientId,
          isAccepted: false,
        }))
      .then(buyRequest => {
        console.log(buyRequest);
        return buyRequest;
      }));
    }),
};
