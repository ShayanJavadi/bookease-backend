import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import GraphQLDate from "graphql-date";
import BuyRequest from "./BuyRequest";
import User from "./User";
import getBuyRequest from "../../db/models/Notification/getBuyRequest";
import getNotificationUser from "../../db/models/Notification/getNotificationUser";

export default new GraphQLObjectType({
  name: "Notification",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: GraphQLID,
    },
    senderId: {
      type: GraphQLID,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isRead: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    buyRequest: {
      type: BuyRequest,
      resolve: notification => notification.buyRequest || getBuyRequest({notification}),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    user: {
      type: new GraphQLNonNull(User),
      resolve: notification => notification.user || getNotificationUser({notification}),
    },
  },
});
