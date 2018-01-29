import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
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
    recipientId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    isAccepted: {
      type: GraphQLBoolean,
    },
  },
});