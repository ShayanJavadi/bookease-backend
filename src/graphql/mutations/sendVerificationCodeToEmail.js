import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import generateRandomVerificationCode from "../../db/models/User/generateRandomVerificationCode";
import sendVerificationCodeToEmail from "../../db/models/User/sendVerificationCodeToEmail";

export default {
  type: GraphQLInt,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {email} = args;

    return User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (isEmpty(user)) {
          return User.build({
            email,
            isVerified: false,
          })
            .save();
        }

        return user;
      })
      .then((user) => {
        if (user.isVerified) {
          throw new Error("The email address has already been verified!", 400);
        }

        return generateRandomVerificationCode(user);
      })
      .then(saved => sendVerificationCodeToEmail(saved))
      .then(() => 200);
  },
};
