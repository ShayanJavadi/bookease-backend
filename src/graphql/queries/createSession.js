import {GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";

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
    const {models: {User}} = db;
    const or = [];

    if (!isEmpty(args.email)) {
      or.push({email: args.email});
    }

    if (!isEmpty(args.phoneNumber)) {
      or.push({phoneNumber: args.phoneNumber});
    }

    if (isEmpty(or)) {
      throw new Error("Either email or phoneNumber must be presented!", 400);
    }

    return User.findOne({
      $or: or,
    }).then((existingUser) => {
      if (isEmpty(existingUser)) {
        return User.create(args);
      }

      return User.save(args);
    }).then((user) => {
      session.userId = user.id; // eslint-disable-line
    });
  },
};
