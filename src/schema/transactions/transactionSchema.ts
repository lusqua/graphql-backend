import { GraphQLList } from "graphql";
import { transactionType } from "../../modules/transactions/type";
import { listTransactions } from "../../modules/transactions/listTransactions";

export const transactions = {
  type: new GraphQLList(transactionType),
  resolve: listTransactions,
};
