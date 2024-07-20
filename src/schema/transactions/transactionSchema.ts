import { GraphQLList, GraphQLString } from "graphql";
import { transactionType } from "../../modules/transactions/type";
import { listTransactions } from "../../modules/transactions/repositories/listTransactions";
import { transactionsByAccount } from "../../modules/transactions/resolvers/transactionsByAccount";

export const transactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions",
  resolve: listTransactions,
};

export const accountTransactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions by account",
  args: {
    accountId: {
      type: GraphQLString,
    },
  },
  resolve: async (_: any, args: any) => {
    return transactionsByAccount(args.accountId);
  },
};
