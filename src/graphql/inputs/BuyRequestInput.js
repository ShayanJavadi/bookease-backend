import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";

export default new GraphQLInputObjectType({
  name: "BuyRequestInput",
  fields: {
    id: {
      type: GraphQLID,
    },
    userId: {
      type: GraphQLID,
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    notificationId: {
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
  },
});
