import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
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
        name: {
          $ilike: `${name}%`,
        },
      },
      limit,
      order: [
        ["name", "ASC"],
      ],
    });
  },
};
