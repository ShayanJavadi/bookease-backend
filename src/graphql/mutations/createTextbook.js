import extend from "lodash/extend";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import TextbookType from "../types/Textbook";
import TextbookInput from "../inputs/TextbookInput";
import acl from "../acl";
import generateRandomUID from "../../db/models/Textbook/generateRandomUID";

export default {
  type: TextbookType,
  args: {
    textbook: {
      type: TextbookInput,
    },
  },
  resolve: (req, args) => acl(req, args)
    .then(() => {
      const {
        models: {
          Textbook,
          TextbookAuthor,
          TextbookImage,
          TextbookIndustryIdentifier,
        },
      } = db;
      return db.transaction(transaction => Textbook.build(extend({
        id: generateRandomUID(),
        uid: generateRandomUID(),
      }, args.textbook, {userId: req.session.userId}))
        .save({transaction})
        .then((textbook) => {
          if (isEmpty(args.textbook.authors)) {
            return textbook;
          }

          return TextbookAuthor.bulkCreate(map(args.textbook.authors, author => ({
            textbookId: textbook.id,
            userId: req.session.userId,
            name: author,
          })), {transaction})
            .then(() => textbook);
        })
        .then((textbook) => {
          if (isEmpty(args.textbook.industryIdentifiers)) {
            return textbook;
          }

          const industryIdentifiers = map(
            args.textbook.industryIdentifiers,
            industryIdentifier => extend({}, industryIdentifier, {
              textbookId: textbook.id,
              userId: req.session.userId,
            }),
          );

          return TextbookIndustryIdentifier.bulkCreate(industryIdentifiers, {transaction})
            .then(() => textbook);
        })

        .then((textbook) => {
          if (isEmpty(args.textbook.images)) {
            return textbook;
          }

          const images = map(args.textbook.images, (image, index) => extend({}, image, {
            textbookId: textbook.id,
            userId: req.session.userId,
            priority: image.priority || index,
          }));

          return TextbookImage.bulkCreate(images, {transaction})
            .then(() => textbook);
        }));
    }),
};
