import db from "../../connection";

export default ({ textbook }) => {
  const { models: { TextbookIndustryIdentifier } } = db;

  return TextbookIndustryIdentifier.findAll({
    where: {
      textbookId: textbook.id,
      userId: textbook.userId,
    },
    order: [["type", "DESC"]],
  });
};
