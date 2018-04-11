import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";

export default new GraphQLInputObjectType({
  name: "NotificationInput",
  fields: {
    id: {
      type: GraphQLID,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: GraphQLID,
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isRead: {
      type: GraphQLBoolean,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    senderId: {
      type: GraphQLID,
    },
  },
});
