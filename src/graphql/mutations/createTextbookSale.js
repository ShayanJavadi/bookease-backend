import db from "../../db";
import TextbookSaleType from "../types/TextbookSale";
import TextbookSaleInput from "../inputs/TextbookSaleInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: TextbookSaleType,
  args: {
    textbookSale: {
      type: TextbookSaleInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(async () => {
      const {
        models: {
          TextbookSale,
        },
      } = db;

      const {textbookId, buyRequestId, buyerId} = args.textbookSale;

      const createdTextbookSale = await TextbookSale.create({
        textbookId,
        sellerId: req.session.userId,
        buyerId,
        buyRequestId,
      });

      return createdTextbookSale;
    }),
};
