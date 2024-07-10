import { GraphQLList } from "graphql";
import { transactionType } from "../../modules/transactions/type";
import { listTransactions } from "../../modules/transactions/repositories/listTransactions";

export const transactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions",
  resolve: listTransactions,
};
