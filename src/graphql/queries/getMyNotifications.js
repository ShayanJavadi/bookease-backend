import {GraphQLInt, GraphQLList} from "graphql";
import NotificationType from "../types/Notification";
import db from "../../db";

export default {
  type: new GraphQLList(NotificationType),
  description: "Get the user's notifications.",
  args: {
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, args) => {
    const {models: {Notification}} = db;
    const {limit = 10} = args;

    return Notification.findAll({
      where: {
        userId: req.session.userId,
      },
      limit,
      order: [["createdAt", "DESC"]],
    });
  },
};
