import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from "graphql";

export interface GraphQLContext {}

const query = new GraphQLObjectType<Record<string, unknown>, GraphQLContext>({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
  },
});

export const schema = new GraphQLSchema({
  query,
});
