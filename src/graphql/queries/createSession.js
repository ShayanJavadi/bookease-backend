import {GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";

export default {
  type: GraphQLInt,
  args: {
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    photoURL: {
      type: GraphQLString,
    },
    uid: {
      type: new GraphQLNonNull(GraphQLID),
    },
    phoneNumber: {
      type: GraphQLString,
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: ({session}, args) => {
    const user = {
      id: args.uid,
    };

    session.userId = user.id; // eslint-disable-line
    return 200;
  },
};
