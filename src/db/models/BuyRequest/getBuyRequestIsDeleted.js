import db from "../../connection";

export default ({buyRequest}) => {
  const {models: {Textbook}} = db;

  return Textbook.findOne({
    where: {
      id: buyRequest.textbookId,
    },
  })
    .then(textbook => textbook.isDeleted);
};
