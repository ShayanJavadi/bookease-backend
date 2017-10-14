import {GraphQLInt, GraphQLList, GraphQLString} from "graphql";
import reduce from "lodash/reduce";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import {Op} from "sequelize";
import isISBN from "validator/lib/isISBN";
import TextbookType from "../types/Textbook";
import requireAuthenticated from "../acl/requireAuthenticated";
import db from "../../db";
import acl from "../acl";

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
  },
  resolve: (req, args) => acl(req, args, requireAuthenticated)
    .then(() => {
      const {query, limit = 10, offset = 0} = args;
      const {models: {Textbook, TextbookIndustryIdentifier}} = db;

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

              const where = {
                id: {[Op.in]: textbookIds},
                publishedAt: { [Op.ne]: null }
              };

              return Textbook.findAll({
                where,
                limit,
                offset,
              });
            });
        }

        const where = {
          title: {
            $ilike: `%${trim(query)}%`,
          },
          publishedAt: { [Op.ne]: null }
        };

        return Textbook.findAll({
          where,
          limit,
          offset,
        });
      }

      return Textbook.findAll({
        where: {
          publishedAt: { [Op.ne]: null }
        },
      });
    }),
};
