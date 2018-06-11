import { isEmpty } from "lodash";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";
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
        },
      } = db;

      const { id } = args;

      return Textbook.findOne({
        where: {
          id,
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
