import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import UserType from "../types/User";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";

export default {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
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
      type: GraphQLID,
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
    schoolId: {
      type: GraphQLID,
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    return acl(req, args, requireAuthenticated)
      .then(() => {
        if (args.id !== req.session.userId) {
          throw new Error("You can't modify the profile that is not yours!");
        }
        return true;
      })
      .then(() => User.findById(args.id))
      .then((existingUser) => {
        if (isEmpty(existingUser)) {
          throw new Error("The requested user is not found!");
        }

        return existingUser.update(args);
      });
  },
};
