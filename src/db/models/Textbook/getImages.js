import db from "../../connection";

export default ({ textbook }) => {
  const { models: { TextbookImage } } = db;

  return TextbookImage.findAll({
    where: {
      textbookId: textbook.id,
      userId: textbook.userId,
    },
  });
};
