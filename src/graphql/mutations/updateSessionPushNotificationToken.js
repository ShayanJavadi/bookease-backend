import {GraphQLInt, GraphQLString} from "graphql";

export default {
  type: GraphQLInt,
  args: {
    token: {
      type: GraphQLString,
    },
  },
  resolve: (req, args) => {
    const {token} = args;

    req.session.pushNotificationToken = token; // eslint-disable-line
    return 200;
  },
};
