import { isEmpty } from "lodash";
import db from "../../connection";

export default ({ buyRequest }) => {
  const { models: { TextbookSale } } = db;

  return TextbookSale.find({
    where: {
      textbookId: buyRequest.textbookId,
    },
  })
    .then(sale => !isEmpty(sale));
};
