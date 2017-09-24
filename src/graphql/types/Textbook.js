import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import map from "lodash/map";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifier";
import TextbookImageLink from "./TextbookImageLink";
import getImageLinks from "../../db/models/Textbook/getImageLinks";
import getAuthors from "../../db/models/Textbook/getAuthors";

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
    },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: (textbook, ignored, ignored1, {rootValue: {db}}) => getAuthors({db, textbook})
        .then(authors => map(authors, "name")),

    },
    edition: {
      type: GraphQLString,
    },
    imageLinks: {
      type: new GraphQLNonNull(TextbookImageLink),
      resolve: (textbook, ignored, ignored1, {rootValue: {db}}) => getImageLinks({db, textbook}),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
});
