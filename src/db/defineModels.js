import B from "bluebird";
import values from "lodash/values";
import defineUser from "./models/defineUser";
import defineUserFacebook from "./models/defineUserFacebook";
import defineUserGoogle from "./models/defineUserGoogle";
import defineSchool from "./models/defineSchool";
import defineTextbook from "./models/defineTextbook";
import defineTextbookIndustryIdentifier from "./models/defineTextbookIndustryIdentifier";
import defineTextbookAuthor from "./models/defineTextbookAuthor";
import defineTextbookImage from "./models/defineTextbookImage";
import defineTextbookSale from "./models/defineTextbookSale";
import defineBuyRequest from "./models/defineBuyRequest";
import defineNotification from "./models/defineNotification";

export default ({db, sync}) => {
  /* eslint-disable */
  db.models = {};
  db.models.School = defineSchool(db);
  db.models.User = defineUser(db);
  db.models.UserFacebook = defineUserFacebook(db);
  db.models.UserGoogle = defineUserGoogle(db);
  db.models.Textbook = defineTextbook(db);
  db.models.TextbookSale = defineTextbookSale(db)
  db.models.TextbookAuthor = defineTextbookAuthor(db);
  db.models.TextbookImage = defineTextbookImage(db);
  db.models.TextbookIndustryIdentifier = defineTextbookIndustryIdentifier(db);
  db.models.Notification = defineNotification(db);
  db.models.BuyRequest = defineBuyRequest(db);

  if (sync) {
    return B.each(values(db.models), model => model.sync({ force: true }))
      .then(() => db);
  }
  /* eslint-enable */

  return db;
};
