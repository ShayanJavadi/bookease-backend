import db from "../../connection";

export default ({textbook}) => {
  const {models: {Notification}} = db;

  return Notification.findAll({
    where: {
      textbookId: textbook.id,
    },
    order: [["createdAt", "DESC"]],
  });
};
