import {GraphQLObjectType} from "graphql";
import isEmpty from "lodash/isEmpty";
import UserType from "./User";
import db from "../../db";

export default new GraphQLObjectType({
  name: "Session",
  fields: {
    user: {
      type: UserType,
      resolve: (source) => {
        const {models: {User}} = db;

        if (isEmpty(source.userId)) {
          return null;
        }

        return User.find({
          where: {
            id: source.userId,
          },
        });
      },
    },
  },
});
