import db from "../../connection";

export default ({user}) => {
  const {models: {School}} = db;

  return School.find({
    where: {
      id: user.schoolId,
    },
  });
};
