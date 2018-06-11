import { isEmpty, reduce, map, extend } from "lodash";
import B from "bluebird";
import db from "../../db";
import TextbookType from "../types/Textbook";
import TextbookInput from "../inputs/TextbookInput";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: TextbookType,
  args: {
    textbook: {
      type: TextbookInput,
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {
        models: {
          Textbook,
          TextbookAuthor,
          TextbookImage,
          TextbookIndustryIdentifier,
        },
      } = db;

      const { textbook } = args;
      return Textbook.findOne({
        where: {
          id: textbook.id,
        },
      })
        .then((textbookToUpdate) => {
          if (isEmpty(textbookToUpdate)) {
            throw new Error("The requested textbook was not found!", 404);
          }

          return db.transaction((transaction) => {
            const values = reduce(textbook, (result, value, key) => {
              if (value) {
                result[`${key}`] = value; // eslint-disable-line no-param-reassign
              }
              return result;
            }, {});

            return textbookToUpdate.update(values, { transaction })
              .then(() => {
                const promises = [];
                const {
                  authors, images, industryIdentifiers, id,
                } = textbook;

                if (!isEmpty(authors)) {
                  promises.push(TextbookAuthor.destroy({
                    where: {
                      textbookId: id,
                    },
                  })
                    .then(() => TextbookAuthor.bulkCreate(map(args.textbook.authors, author => ({
                      textbookId: textbook.id,
                      userId: req.session.userId,
                      name: author,
                    })), { transaction })));
                }

                if (!isEmpty(images)) {
                  promises.push(TextbookImage.destroy({
                    where: {
                      textbookId: id,
                    },
                  })
                    .then(() => {
                      const updatedImages = map(
                        args.textbook.images,
                        (image, index) => extend({}, image, {
                          textbookId: textbook.id,
                          userId: req.session.userId,
                          priority: image.priority || index,
                        }),
                      );
                      return TextbookImage.bulkCreate(updatedImages, { transaction });
                    }));
                }

                if (!isEmpty(industryIdentifiers)) {
                  promises.push(TextbookIndustryIdentifier.destroy({
                    where: {
                      textbookId: id,
                    },
                  })
                    .then(() => {
                      const updatedIndustryIdentifiers = map(
                        args.textbook.industryIdentifiers,
                        industryIdentifier => extend({}, industryIdentifier, {
                          textbookId: textbook.id,
                          userId: req.session.userId,
                        }),
                      );

                      return TextbookIndustryIdentifier.bulkCreate(
                        updatedIndustryIdentifiers,
                        { transaction },
                      );
                    }));
                }

                return B.all(promises);
              });
          })
            .then(() => Textbook.findOne({
              where: {
                id: textbook.id,
              },
            }));
        });
    }),
};
