import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";

export default {
  type: GraphQLInt,
  args: {
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    verificationCode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {phoneNumber, verificationCode} = args;

    return User.findOne({
      where: {
        phoneNumber,
        verificationCode,
      },
    })
      .then((user) => {
        if (isEmpty(user)) {
          throw new Error("The entered phoneNumber and verification code does not match!", 400);
        }

        if (user.isVerified) {
          throw new Error("The phoneNumber has already verified!", 400);
        }

        return user.update({
          isVerified: true,
          verificationCode: null,
        });
      })
      .then(() => 200);
  },
};
