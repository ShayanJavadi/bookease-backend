import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql";
import Textbook from "./Textbook";

export default new GraphQLObjectType({
  name: "TextbookLookupResult",
  fields: {
    totalItems: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    textbooks: {
      type: new GraphQLList(Textbook),
    },
  },
});
