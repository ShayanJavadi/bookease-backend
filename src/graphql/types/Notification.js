import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import GraphQLDate from "graphql-date";
import BuyRequest from "./BuyRequest";

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
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
  },
});
