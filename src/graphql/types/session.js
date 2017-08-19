import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Session',
  fields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
