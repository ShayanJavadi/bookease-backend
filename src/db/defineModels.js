import B from "bluebird";
import values from "lodash/values";
import defineUser from "./models/defineUser";
import defineSchool from "./models/defineSchool";
import defineTextbook from "./models/defineTextbook";
import defineTextbookIndustryIdentifier from "./models/defineTextbookIndustryIdentifier";
import defineTextbookAuthor from "./models/defineTextbookAuthor";
import defineTextbookImage from "./models/defineTextbookImage";

export default ({db, sync = false}) => {
  /* eslint-disable */
  db.models = {};
  db.models.School = defineSchool(db);
  db.models.User = defineUser(db);
  db.models.Textbook = defineTextbook(db);
  db.models.TextbookAuthor = defineTextbookAuthor(db);
  db.models.TextbookImage = defineTextbookImage(db);
  db.models.TextbookIndustryIdentifier = defineTextbookIndustryIdentifier(db);

  if (sync) {
    return B.each(values(db.models), model => model.sync({ force: true }))
      .then(() => db);
  }
  /* eslint-enable */

  return db;
};

