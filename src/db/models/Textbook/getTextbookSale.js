import db from "../../connection";

export default ({textbook}) => {
  const {models: {TextbookSale}} = db;

  return TextbookSale.find({
    where: {
      textbookId: textbook.id,
    },
  });
};
