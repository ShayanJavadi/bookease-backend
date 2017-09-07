import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifier";
import TextbookImageLink from "./TextbookImageLink";

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
      type: GraphQLID,
    },
    description: {
      type: GraphQLString,
    },
    industryIdentifiers: {
      type: new GraphQLList(TextbookIndustryIdentifier),
    },
    authors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
    edition: {
      type: GraphQLString,
    },
    imageLinks: {
      type: new GraphQLNonNull(TextbookImageLink),
    },
  },
});
