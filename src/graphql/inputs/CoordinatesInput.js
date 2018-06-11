import { GraphQLFloat, GraphQLInputObjectType } from "graphql";

export default new GraphQLInputObjectType({
  name: "CoordinatesInput",
  fields: {
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    },
  },
});
