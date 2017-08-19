import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const files = fs.readdirSync(path.join(__dirname, 'queries'));
const fields = _.reduce(files, (memo, file) => {
  const name = file.split('.').shift();
  memo[name] = require(`./queries/${name}`).default; // eslint-disable-line
  return memo;
}, {});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields,
  }),
});

export default schema;
