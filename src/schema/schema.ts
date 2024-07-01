import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from "graphql";
import { GraphQLContext } from "../context";
import { Mutation } from "./mutation";
import { transactions } from "./transactions/transactionSchema";
import { account, accounts } from "./accounts/accountschema";

const query = new GraphQLObjectType<Record<string, unknown>, GraphQLContext>({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    accounts,
    account,
    transactions,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation: Mutation,
});
