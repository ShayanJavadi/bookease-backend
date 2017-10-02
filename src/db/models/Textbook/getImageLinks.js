import db from "../../connection";

export default ({textbook}) => {
  const {models: {TextbookImageLink}} = db;

  return TextbookImageLink.find({
    where: {
      textbookId: textbook.id,
      userId: textbook.userId,
    },
  });
};
