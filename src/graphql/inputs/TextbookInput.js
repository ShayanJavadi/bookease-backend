import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLString} from "graphql";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifierInput";
import TextbookImage from "./TextbookImageInput";

export default new GraphQLInputObjectType({
  name: "TextbookInput",
  fields: {
    id: {
      type: GraphQLID,
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
    images: {
      type: new GraphQLNonNull(new GraphQLList(TextbookImage)),
    },
  },
});
