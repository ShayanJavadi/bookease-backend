import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
} from "graphql";

export default new GraphQLInputObjectType({
  name: "BookmarkInput",
  fields: {
    id: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLID,
    },
    textbookId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
