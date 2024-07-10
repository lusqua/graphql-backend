import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { Transaction } from "../type";
import DataLoader from "dataloader";
import { batchAccountsByIds } from "../../accounts/repositories/batchAccountsByIds";

export const listTransactions = async (
  transactions: Collection = database.collection("transactions")
) => {
  const transactionsList = await database
    .collection("transactions")
    .find()
    .toArray();

  const accountLoader = new DataLoader<string, any>((ids) =>
    batchAccountsByIds(ids)
  );

  return transactionsList.map((transaction) => ({
    _id: transaction._id.toHexString(),
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
  }));
};
