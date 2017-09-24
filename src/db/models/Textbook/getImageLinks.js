export default ({db, textbook}) => {
  const {TextbookImageLink} = db.models;

  return TextbookImageLink.find({
    where: {
      textbookId: textbook.id,
    },
  });
};
