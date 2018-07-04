import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import encryptPassword from "../../db/models/User/encryptPassword";

export default {
  type: GraphQLInt,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    verificationCode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (req, args) => {
    const { models: { User } } = db;
    const { email, verificationCode } = args;

    return User.findOne({
      where: {
        email,
        verificationCode,
      },
    })
      .then((user) => {
        if (isEmpty(user)) {
          throw new Error("The entered email and verification code does not match!", 400);
        }

        if (user.isVerified) {
          throw new Error("The email has already verified!", 400);
        }

        return user.update({
          isVerified: true,
          verificationCode: null,
          password: encryptPassword(args.verificationCode),
        });
      })
      .then(() => 200);
  },
};
