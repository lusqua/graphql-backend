import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { config } from "../../../config";

export const listTransactionsRepository = async (
  collection: Collection = database.collection(config.collections.transactions)
) => {
  const transactionsList = await collection.find().toArray();

  return transactionsList.map((transaction) => ({
    _id: transaction._id.toHexString(),
    account: transaction.account,
    targetAccount: transaction.targetAccount,
    amount: transaction.amount,
    code: transaction.code,
    createdAt: transaction.createdAt,
  }));
};
