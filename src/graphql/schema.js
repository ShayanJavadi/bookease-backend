import {GraphQLObjectType, GraphQLSchema} from "graphql";
import requireFiles from "./requireFiles";

const queries = requireFiles({folderName: "queries"});
const mutations = requireFiles({folderName: "mutations"});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: queries,
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: mutations,
  }),
});

export default schema;
