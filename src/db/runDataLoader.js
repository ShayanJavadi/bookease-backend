import csv from "csv";
import fs from "fs";
import path from "path";
import isEmpty from "lodash/isEmpty";
import compact from "lodash/compact";
import trim from "lodash/trim";
import B from "bluebird";
import values from "lodash/values";
import L from "../logger/logger";

export default ({School}) => {
  L.info("Start loading schools...");

  return School.destroy({
    where: {},
  })
    .then(() => new B((resolve) => {
      const readStream = fs.createReadStream(path.resolve(__dirname, "../../data/schools.csv"));
      const parser = csv.parse();
      let firstRowRead = false;
      const rows = {};

      readStream
        .on("data", chunk => parser.write(chunk))
        .on("end", () => parser.end());

      parser.on("readable", () => {
        let data;
        while (data = parser.read()) { // eslint-disable-line
          if (!firstRowRead) {
            firstRowRead = true;
            continue; // eslint-disable-line
          }
          if (isEmpty(data)) {
            continue; // eslint-disable-line
          }

          const id = parseInt(data[0], 10);

          rows[id] = {
            id,
            name: data[1],
            address: compact([
              data[2],
              data[3],
              trim(data[4] + " " + data[5]) // eslint-disable-line
            ]).join(", "),
          };
        }
      });

      parser.on("end", () => resolve(values(rows)));
    }))
    .then((rows) => {
      L.info(`About to insert ${rows.length} schools`);

      return School.bulkCreate(rows);
    })
    .catch(e => L.error(`Error occurred: ${e.message}`))
    .finally(() => L.info("all schools have been inserted."));
};
