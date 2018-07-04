import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export default new GraphQLInputObjectType({
  name: "UserGoogleInput",
  fields: {
    uid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
