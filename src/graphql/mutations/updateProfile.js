import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import isEmpty from "lodash/isEmpty";
import db from "../../db";
import acl from "../acl";
import requireAuthenticated from "../acl/requireAuthenticated";
import UserType from "../types/User";
import encryptPassword from "../../db/models/User/encryptPassword";

export default {
  type: UserType,
  args: {
    schoolId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLString,
    },
  },
  resolve: (req, args) => {
    const {models: {User}} = db;
    const {session} = req;
    const {schoolId, name} = args;

    return acl(req, args, requireAuthenticated)
      .then(() => User.findOne({
        where: {
          id: session.userId,
        },
      }))
      .then((user) => {
        console.log(user, "<-- ");


        if (isEmpty(user)) {
          throw new Error("The requested user is not found!", 404);
        }

        const values = {
          schoolId,
          name,
        };

        if (!isEmpty(args.password)) {
          values.password = encryptPassword(args.password);
        }

        return user.update(values)
          .then((updatedUser) => {
            console.log(updatedUser);
            return user;
          });
      });
  },
};
