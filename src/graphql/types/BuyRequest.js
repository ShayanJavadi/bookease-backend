import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

export default new GraphQLObjectType({
  name: "BuyRequest",
  fields: {
    id: {
      type: GraphQLID,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    recipientId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    isAccepted: {
      type: GraphQLBoolean,
    },
  },
});
