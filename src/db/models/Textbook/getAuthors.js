import db from "../../connection";

export default ({ textbook }) => {
  const { models: { TextbookAuthor } } = db;

  return TextbookAuthor.findAll({
    where: {
      textbookId: textbook.id,
      userId: textbook.userId,
    },
  });
};
