import {GraphQLObjectType} from "graphql";
import UserType from "./User";

export default new GraphQLObjectType({
  name: "Session",
  fields: {
    user: {
      type: UserType,
    },
  },
});
