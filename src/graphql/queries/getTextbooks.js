import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import reduce from "lodash/reduce";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import { Op } from "sequelize";
import isISBN from "validator/lib/isISBN";
import TextbookType from "../types/Textbook";
import db from "../../db";

export default {
  type: new GraphQLList(TextbookType),
  description: "get all selling textbooks",
  args: {
    query: {
      type: GraphQLString,
      description: "query to search, provide isbn directly will search by isbn",
    },
    limit: {
      type: GraphQLInt,
    },
    offset: {
      type: GraphQLInt,
    },
    orderBy: {
      type: GraphQLString,
    },
  },
  resolve: (req, args) => {
    const {
      query, limit = 10, offset = 0, orderBy = "relevance",
    } = args;
    const { models: { Textbook, TextbookIndustryIdentifier } } = db;
    const schoolIdWhereClause = req.session ? { schoolId: req.session.schoolId } : {};
    const where = {
      title: {
        $ilike: `%${trim(query)}%`,
      },
      isArchived: false,
      isDeleted: false,
      ...schoolIdWhereClause,
    };
    const getOrder = () => {
      switch (orderBy) {
        case "condition":
          return [["condition", "DESC"]];
        case "price-high-to-low":
          return [["price", "DESC"]];
        case "price-low-to-high":
          return [["price", "ASC"]];
        default:
          return [];
      }
    };
    const order = getOrder();


    if (!isEmpty(query)) {
      if (isISBN(query)) {
        return TextbookIndustryIdentifier.findAll({
          where: {
            identifier: query,
          },
          attributes: [[db.fn("DISTINCT", db.col("textbookId")), "textbookId"]],
        })
          .then((textbookIdentifiers) => {
            const textbookIds = reduce(textbookIdentifiers, (memo, textbookIdentifier) => {
              memo.push(textbookIdentifier.textbookId);
              return memo;
            }, []);

            if (isEmpty(textbookIds)) {
              return [];
            }

            const textbookIdentifiersWhere = {
              id: { [Op.in]: textbookIds },
            };

            return Textbook.findAll({
              where: textbookIdentifiersWhere,
              limit,
              offset,
            });
          });
      }

      return Textbook.findAll({
        where,
        limit,
        offset,
        order,
      });
    }

    return Textbook.findAll({
      limit: 10,
      where,
      order,
    });
  },
};
