import {GraphQLInt, GraphQLString} from "graphql";
import google from "googleapis";
import B from "bluebird";
import {extend, get, map} from "lodash";
import isISBN from "validator/lib/isISBN";
import TextbookLookupResult from "../types/TextbookLookupResult";

export default {
  type: TextbookLookupResult,
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
  resolve: (req, {query, limit = 10, offset = 0}) => {
    const books = google.books("v1");
    const {volumes: {list}} = books;
    const q = isISBN(query) ? `isbn:${query}` : query;

    return B.promisify(list, books)({
      q,
      maxResults: limit,
      startIndex: offset,
      orderBy: "relevance",
    })
      .spread(response => ({
        totalItems: get(response, "totalItems", 0),
        textbooks: map(get(response, "items", []), item => ({
          id: get(item, "id"),
          uid: get(item, "id"),
          title: get(item, "volumeInfo.title"),
          authors: get(item, "volumeInfo.authors", []),
          industryIdentifiers: get(item, "volumeInfo.industryIdentifiers", []),
          images: [extend({priority: 0}, get(item, "volumeInfo.imageLinks", {}))],
        })),
      }));
  },
};
