import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import GraphQLDate from "graphql-date";
import Textbook from "./Textbook";
import getBuyRequestTextbook from "../../db/models/BuyRequest/getBuyRequestTextbook";

export default new GraphQLObjectType({
  name: "BuyRequest",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbook: {
      type: new GraphQLNonNull(Textbook),
      resolve: buyRequest => buyRequest.textbook || getBuyRequestTextbook({buyRequest}),
    },
    notificationId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    recipientId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    isAccepted: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
  },
});
