import {GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import UserType from "../types/User";
import encryptPassword from "../../db/models/User/encryptPassword";

export default {
  type: UserType,
  args: {
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {session} = req;

    return User.findOne({
      where: {
        phoneNumber: args.phoneNumber,
        password: encryptPassword(args.password),
      },
    })
      .then((user) => {
        if (isEmpty(user)) {
          throw new Error("Phone number or password is not valid!", 400);
        }

        session.userId = user.id; // eslint-disable-line
        return user;
      })
      .catch(e => {
        console.error(e);
        return null;
      });
  },
};
