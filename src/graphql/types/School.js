import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";

export default new GraphQLObjectType({
  name: "School",
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
    enrollmentCount: {
      type: GraphQLInt,
    }
  },
});
