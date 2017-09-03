import {GraphQLID, GraphQLInt, GraphQLNonNull} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";

export default {
  type: GraphQLInt,
  args: {
    schoolId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: ({session}, {schoolId}) => {
    const {models: {User}} = db;

    return User.findOne({
      where: {
        id: session.userId,
      },
      attributes: ['id', 'schoolId'],
    })
    .then((user) => {
      if (isEmpty(user)) {
        throw new Error("The requested user is not found!", 404);
      }

      if (user.schoolId) {
        throw new Error("The requested user has already completed the profile set up step!", 409);
      }

      user.schoolId = schoolId;

      return user.save();
    })
    .then((user) => 200);
  },
};
