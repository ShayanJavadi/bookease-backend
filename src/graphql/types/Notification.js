import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";

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
  },
});
