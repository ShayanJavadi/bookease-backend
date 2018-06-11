import map from "lodash/map";
import difference from "lodash/difference";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";
import includes from "lodash/includes";
import { Op } from "sequelize";
import db from "../../../db";

export default ({ schools }) => {
  const ids = map(schools, "id");
  const { models: { School } } = db;

  return School.findAll({
    where: {
      id: { [Op.in]: ids },
    },
    attributes: ["id"],
  })
    .then((records) => {
      const existingIds = map(records, "id");

      const newIds = difference(ids, existingIds);

      if (isEmpty(newIds)) {
        return records;
      }

      const schoolsToInsert = filter(schools, school => includes(newIds, school.id));
      return School.bulkCreate(schoolsToInsert);
    });
};
