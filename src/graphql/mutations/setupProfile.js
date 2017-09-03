import {GraphQLID, GraphQLInt, GraphQLNonNull} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: GraphQLInt,
  args: {
    schoolId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {session} = req;
    const {schoolId} = args;

    return acl(req, args, requireAuthenticated)
      .then(() => User.findOne({
        where: {
          id: session.userId,
        },
        attributes: ["id", "schoolId"],
      }))
      .then((user) => {
        if (isEmpty(user)) {
          throw new Error("The requested user is not found!", 404);
        }

        if (user.schoolId) {
          throw new Error("The requested user has already completed the profile set up step!", 409);
        }

        return user.update({
          schoolId,
        });
      })
      .then(() => 200);
  },
};
