import isEmpty from "lodash/isEmpty";
import {GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import getFacebook from "../../db/models/User/getFacebook";
import getGoogle from "../../db/models/User/getGoogle";
import UserFacebook from "../types/UserFacebook";
import UserGoogle from "../types/UserGoogle";

export default new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLID,
    },
    displayName: {
      type: GraphQLString,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    photoURL: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    setupCompleted: {
      type: GraphQLBoolean,
      resolve: source => !isEmpty(source.schoolId),
    },
    schoolId: {
      type: GraphQLID,
    },
    facebook: {
      type: UserFacebook,
      resolve: user => getFacebook({user}),
    },
    google: {
      type: UserGoogle,
      resolve: user => getGoogle({user}),
    },
    pushNotificationToken: {
      type: GraphQLString,
    },
  },
});
