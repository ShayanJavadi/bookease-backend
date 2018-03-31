import {GraphQLInt} from "graphql";

export default {
  type: GraphQLInt,
  resolve: (req) => {
    const {session} = req;
    session.userId = null; // eslint-disable-line
    session.schoolId = null; // eslint-disable-line
    session.pushNotificationToken = null; // eslint-disable-line
    return 200;
  },
};
