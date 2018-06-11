import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import GraphQLDate from "graphql-date";
import Textbook from "./Textbook";
import User from "./User";
import getBuyRequestTextbook from "../../db/models/BuyRequest/getBuyRequestTextbook";
import getBuyRequestIsActive from "../../db/models/BuyRequest/getBuyRequestIsActive";
import getBuyRequestIsDeleted from "../../db/models/BuyRequest/getBuyRequestIsDeleted";
import getBuyRequestUser from "../../db/models/BuyRequest/getBuyRequestUser";
import getBuyRequestIsTextbookSold from "../../db/models/BuyRequest/getBuyRequestIsTextbookSold";
import db from "../../db";

export default new GraphQLObjectType({
  name: "BuyRequest",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userPhoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    notificationId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    recipientId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    recipientPhoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isAccepted: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    isActive: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: buyRequest => buyRequest.isActive || getBuyRequestIsActive({ buyRequest }),
    },
    isDeleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: buyRequest => buyRequest.isDeleted || getBuyRequestIsDeleted({ buyRequest }),
    },
    isTextbookSold: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: buyRequest => buyRequest.isSold || getBuyRequestIsTextbookSold({ buyRequest }),
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
    user: {
      type: new GraphQLNonNull(User),
      resolve: buyRequest => buyRequest.user || getBuyRequestUser({ buyRequest }),
    },
    recipientUser: {
      type: new GraphQLNonNull(User),
      resolve: buyRequest => buyRequest.recipientUser || db.models.User.findOne({
        where: {
          id: buyRequest.recipientId,
        },
      }),
    },
    isUserRequester: {
      type: GraphQLBoolean,
      resolve: buyRequest => buyRequest.isUserRequester || false,
    },
    textbook: {
      type: new GraphQLNonNull(Textbook),
      resolve: buyRequest => buyRequest.textbook || getBuyRequestTextbook({ buyRequest }),
    },
  },
});
