import db from "../../connection";

export default ({textbook}) => {
  const {models: {Bookmark}} = db;

  return Bookmark.findAndCountAll({
    where: {
      textbookId: textbook.id,
    },
  })
    .then(({count}) => count);
};
