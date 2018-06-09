import db from "../../connection";

export default ({bookmark}) => {
  const {models: {Textbook}} = db;

  return Textbook.find({
    where: {
      id: bookmark.textbookId,
    },
  });
};
