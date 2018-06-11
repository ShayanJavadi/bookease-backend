import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from "graphql";

export default new GraphQLInputObjectType({
  name: "TextbookSaleInput",
  fields: {
    id: {
      type: GraphQLID,
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    buyerId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    buyRequestId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
