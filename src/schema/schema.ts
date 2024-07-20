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
import {
  accountTransactions,
  transactions,
} from "./transactions/transactionSchema";
import { account, accounts } from "./accounts/accountSchema";

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
