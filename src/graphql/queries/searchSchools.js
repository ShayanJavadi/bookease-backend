import { GraphQLInt, GraphQLList, GraphQLString, GraphQLID } from "graphql";
import trim from "lodash/trim";
import SchoolType from "../types/School";
import db from "../../db";

export default {
  type: new GraphQLList(SchoolType),
  args: {
    name: {
      type: GraphQLString,
    },
    limit: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLID,
    },
  },
  resolve: (req, { name, limit = 10, id }) => {
    const { models: { School } } = db;

    if (id) {
      return School.findAll({
        where: {
          id,
        },
      });
    }

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
