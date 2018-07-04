import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import generateRandomVerificationCode from "../../db/models/User/generateRandomVerificationCode";
import sendVerificationCodeToPhoneNumber from "../../db/models/User/sendVerificationCodeToPhoneNumber";

export default {
  type: GraphQLInt,
  args: {
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    const { models: { User } } = db;
    const { phoneNumber } = args;

    return User.findOne({
      where: {
        phoneNumber,
      },
    })
      .then((user) => {
        if (isEmpty(user)) {
          return User.build({
            phoneNumber,
            isVerified: false,
          })
            .save();
        }

        return user;
      })
      .then((user) => {
        if (user.isVerified) {
          throw new Error("The phone number has already been verified!", 400);
        }

        return generateRandomVerificationCode(user);
      })
      .then(saved => sendVerificationCodeToPhoneNumber(saved))
      .then(() => 200);
  },
};
