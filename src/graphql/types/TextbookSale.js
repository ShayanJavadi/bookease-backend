import {GraphQLObjectType, GraphQLNonNull, GraphQLID} from "graphql";

export default new GraphQLObjectType({
  name: "TextbookSale",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
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
    sellerId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
