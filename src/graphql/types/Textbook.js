import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import GraphQLDate from "graphql-date";
import map from "lodash/map";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifier";
import TextbookImage from "./TextbookImage";
import getImages from "../../db/models/Textbook/getImages";
import getAuthors from "../../db/models/Textbook/getAuthors";
import getIndustryIdentifiers from "../../db/models/Textbook/getIndustryIdentifiers";

export default new GraphQLObjectType({
  name: "Textbook",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    uid: {
      type: new GraphQLNonNull(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    industryIdentifiers: {
      type: new GraphQLList(TextbookIndustryIdentifier),
      resolve: textbook => textbook.industryIdentifiers || getIndustryIdentifiers({ textbook }),
    },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: textbook => textbook.authors || getAuthors({ textbook })
        .then(authors => map(authors, "name")),

    },
    edition: {
      type: GraphQLString,
    },
    images: {
      type: new GraphQLNonNull(new GraphQLList(TextbookImage)),
      resolve: textbook => textbook.images || getImages({ textbook }),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDate),
    },
    publishedAt: {
      type: GraphQLDate,
    }
  },
});
