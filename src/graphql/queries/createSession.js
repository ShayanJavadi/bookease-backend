import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

export default {
  type: GraphQLInt,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: ({ session }, { token }) => {
    const user = {
      id: token,
    };

    session.userId = user.id; // eslint-disable-line
    return 200;
  },
};
