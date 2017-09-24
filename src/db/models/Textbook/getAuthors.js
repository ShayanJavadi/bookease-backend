export default ({db, textbook}) => {
  const {TextbookAuthor} = db.models;

  return TextbookAuthor.findAll({
    where: {
      textbookId: textbook.id,
    },
  });
};
