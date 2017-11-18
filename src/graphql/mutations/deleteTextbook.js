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
      const {session} = req;

      return Textbook.findOne({
        where: {
          id,
          userId: req.session.userId,
        },
      })
        .then((textbookToDelete) => {
          if (isEmpty(textbookToDelete)) {
            throw new Error("The requested textbook was not found!", 404);
          }
          return textbookToDelete.destroy();
        })
        .then(() => 200);
    }),
};
