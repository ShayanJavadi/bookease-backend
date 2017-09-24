import extend from "lodash/extend";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import TextbookType from "../types/Textbook";
import TextbookInput from "../inputs/TextbookInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import generateRandomUID from "../../db/models/Textbook/generateRandomUID";

export default {
  type: TextbookType,
  args: {
    textbook: {
      type: TextbookInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {Textbook, TextbookAuthor,
        TextbookImageLink, TextbookIndustryIdentifier}} = db;
      return db.transaction(transaction => Textbook.build(extend({
        uid: generateRandomUID(),
      }, args.textbook, {userId: req.session.userId}))
        .save({transaction})
        .then((textbook) => {
          if (isEmpty(args.textbook.authors)) {
            return textbook;
          }

          return TextbookAuthor.bulkCreate(map(args.textbook.authors, author => ({
            textbookId: textbook.id,
            name: author,
          })), {transaction})
            .then(() => textbook);
        })
        .then((textbook) => {
          if (isEmpty(args.textbook.industryIdentifiers)) {
            return textbook;
          }

          return TextbookIndustryIdentifier.bulkCreate(map(args.textbook.industryIdentifiers,
            industryIdentifier => (extend({}, industryIdentifier, {
              textbookId: textbook.id,
            }))), {transaction})
            .then(() => textbook);
        })

        .then((textbook) => {
          if (isEmpty(args.textbook.imageLinks)) {
            return textbook;
          }

          return TextbookImageLink.build(extend({}, args.textbook.imageLinks, {
            textbookId: textbook.id,
          }))
            .save({transaction})
            .then(() => textbook);
        }));
    }),
};
