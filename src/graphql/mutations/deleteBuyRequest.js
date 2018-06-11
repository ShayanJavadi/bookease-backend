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
          BuyRequest,
        },
      } = db;

      const { id } = args;

      return BuyRequest.findOne({
        where: {
          id,
          userId: req.session.userId,
        },
      })
        .then((buyRequestToDelete) => {
          if (isEmpty(buyRequestToDelete)) {
            throw new Error("The requested buy request was not found!", 404);
          }
          return buyRequestToDelete.destroy();
        })
        .then(() => 200);
    }),
};
