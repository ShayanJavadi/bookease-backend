import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import User from "./User";

export default new GraphQLInputObjectType({
  name: "BuyRequestInput",
  fields: {
    id: {
      type: GraphQLID,
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    notificationId: {
      type: GraphQLID,
    },
    userId: {
      type: GraphQLID,
    },
    recipientId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    isAccepted: {
      type: GraphQLBoolean,
    },
    isActive: {
      type: GraphQLBoolean,
    },
    isDeleted: {
      type: GraphQLBoolean,
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userPhoneNumber: {
      type: GraphQLString,
    },
    recipientPhoneNumber: {
      type: GraphQLString,
    },
    recipientUser: {
      type: User,
    },
    isUserRequester: {
      type: GraphQLBoolean,
    },
  },
});
