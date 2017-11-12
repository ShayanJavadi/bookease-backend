import {isEmpty, reduce} from "lodash";
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
        },
      } = db;

      const {textbook} = args;
      Textbook.findOne({
        where: {
          id: textbook.id,
        },
      })
        .then((textbookToUpdate) => {
          if (isEmpty(textbookToUpdate)) {
            throw new Error("The requested textbook was not found!", 404);
          }

          return db.transaction((transaction) => {
            const values = {};
            reduce(textbook, (result, value, key) => {
              values[`${key}`] = value;
            }, {});

            return textbookToUpdate.update(values, {transaction})
              .then(() => {
                Textbook.findOne({
                  where: {
                    id: textbook.id,
                  },
                });
              });
          });
        });
    }),
};
