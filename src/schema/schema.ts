import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";
import { Mutation } from "./mutation";
import {
  accountTransactions,
  transactions,
} from "./transactions/transactionSchema";
import { accounts } from "../modules/accounts/resolvers/listAccounts";
import { account } from "../modules/accounts/resolvers/findAccount";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    accounts,
    account,
    transactions,
    accountTransactions,
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation: Mutation,
});
