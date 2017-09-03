import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import db from "../../db";
import SessionType from "../types/Session";

export default {
  type: SessionType,
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
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {session} = req;

    return User.findOrCreate({
      where: {
        email: args.email,
      },
      defaults: args,
    })
      .spread((savedUser) => {
        session.userId = savedUser.id; // eslint-disable-line
        return {
          user: savedUser,
        };
      });
  },
};
