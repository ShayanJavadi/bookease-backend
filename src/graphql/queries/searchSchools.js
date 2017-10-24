import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import trim from "lodash/trim";
import SchoolType from "../types/School";
import db from "../../db";

export default {
  type: new GraphQLList(SchoolType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    limit: {
      type: GraphQLInt,
    },
  },
  resolve: (req, {name, limit = 10}) => {
    const {models: {School}} = db;
    return School.findAll({
      where: {
        terms: {
          // TODO: search for UNT should show UNT first
          $like: `%${trim(name.toLowerCase())}%`,
        },
      },
      limit,
      order: [
        ["enrollmentCount", "DESC"],
      ],
    });
  },
};
