import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import map from "lodash/map";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifier";
import TextbookImageLink from "./TextbookImageLink";
import getImageLinks from "../../db/models/Textbook/getImageLinks";
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
      resolve: textbook => textbook.industryIdentifiers || getIndustryIdentifiers({textbook}),
    },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: textbook => textbook.authors || getAuthors({textbook})
        .then(authors => map(authors, "name")),

    },
    edition: {
      type: GraphQLString,
    },
    imageLinks: {
      type: new GraphQLNonNull(TextbookImageLink),
      resolve: textbook => textbook.imageLinks || getImageLinks({textbook}),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
