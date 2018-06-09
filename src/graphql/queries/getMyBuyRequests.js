import {GraphQLInt, GraphQLList} from "graphql";
import BuyRequestType from "../types/BuyRequest";
import db from "../../db";

export default {
  type: new GraphQLList(BuyRequestType),
  description: "Get the user's buy request (textbooks the user is buying).",
  args: {
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, args) => {
    const {models: {BuyRequest}} = db;
    const {limit = 10} = args;

    return BuyRequest.findAll({
      where: {
        userId: req.session.userId,
      },
      limit,
      order: [["createdAt", "DESC"]],
    });
  },
};
