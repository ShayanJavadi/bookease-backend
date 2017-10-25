import {GraphQLInputObjectType, GraphQLNonNull, GraphQLString} from "graphql";

export default new GraphQLInputObjectType({
  name: "UserFacebookInput",
  fields: {
    uid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
