import { GraphQLList } from "graphql";
import { transactionType } from "../type";
import { listTransactionsRepository } from "../repositories/listTransactions";
import DataLoader from "dataloader";
import { batchAccountsByIds } from "../../accounts/repositories/batchAccountsByIds";

const listTransactions = async () => {
  const accountLoader = new DataLoader<string, any>((ids) =>
    batchAccountsByIds(ids)
  );

  const transactions = await listTransactionsRepository();

  return transactions.map((transaction) => {
    return {
      _id: transaction._id,
      account: () => {
        const accountId = transaction.account;
        return accountLoader.load(accountId);
      },
      targetAccount: () => {
        const accountId = transaction.targetAccount;
        return accountLoader.load(accountId);
      },
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    };
  });
};

export const transactions = {
  type: new GraphQLList(transactionType),
  description: "List of all transactions",
  resolve: listTransactions,
};
