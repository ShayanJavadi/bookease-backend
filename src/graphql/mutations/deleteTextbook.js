import {isEmpty} from "lodash";
import B from "bluebird";
import {GraphQLInt, GraphQLID, GraphQLNonNull} from "graphql";
import db from "../../db";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: GraphQLInt,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
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

      const {id} = args;

      return Textbook.findOne({
        where: {
          id,
        },
      })
        .then((textbookToDelete) => {
          if (isEmpty(textbookToDelete)) {
            throw new Error("The requested textbook was not found!", 404);
          }

          return db.transaction(() => {
            const promises = [];

            promises.push(textbookToDelete.destroy());

            promises.push(TextbookAuthor.destroy({
              where: {
                textbookId: id,
              },
            }));

            promises.push(TextbookImage.destroy({
              where: {
                textbookId: id,
              },
            }));

            promises.push(TextbookIndustryIdentifier.destroy({
              where: {
                textbookId: id,
              },
            }));

            return B.all(promises);
          });
        })
        .then(() => 200);
    }),
};
