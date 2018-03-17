import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import TextbookIndustryIdentifier from "./TextbookIndustryIdentifierInput";
import TextbookImage from "./TextbookImageInput";
import TextbookSaleInput from "./TextbookSaleInput";

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
    condition: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    isSold: {
      type: GraphQLBoolean,
    },
    sale: {
      type: TextbookSaleInput,
    },
    isArchived: {
      type: GraphQLBoolean,
    },
    isDeleted: {
      type: GraphQLBoolean,
    },
  },
});
