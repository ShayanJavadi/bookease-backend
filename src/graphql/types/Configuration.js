import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import pkg from "../../../package.json";
import getVariable from "../../config/getVariable";

export default new GraphQLObjectType({
  name: "Configuration",
  fields: {
    NAME: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => pkg.name,
    },
    VERSION: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => pkg.version,
    },
    FIREBASE_API_KEY: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_API_KEY"),
    },
    FIREBASE_AUTH_DOMAIN: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_AUTH_DOMAIN"),
    },
    FIREBASE_DATABASE_URL: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_DATABASE_URL"),
    },
    FIREBASE_PROJECT_ID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_PROJECT_ID"),
    },
    FIREBASE_STORAGE_BUCKET: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_STORAGE_BUCKET"),
    },
    FIREBASE_MESSAGING_SENDER_ID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => getVariable("FIREBASE_MESSAGING_SENDER_ID"),
    },
  },
});
