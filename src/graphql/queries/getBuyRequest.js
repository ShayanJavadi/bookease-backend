import {GraphQLID, GraphQLNonNull} from "graphql";
import BuyRequestType from "../types/BuyRequest";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

export default {
  type: BuyRequestType,
  description: "get one buy request",
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {models: {BuyRequest}} = db;
      return BuyRequest.find({
        where: {
          id: args.id,
        },
      });
    }),
};
