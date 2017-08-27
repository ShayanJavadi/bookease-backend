import {GraphQLInt} from "graphql";

export default {
  type: GraphQLInt,
  resolve: ({session}) => {
    session.userId = null; // eslint-disable-line
    return 200;
  },
};
