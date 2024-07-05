import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { Transaction } from "../type";

export const listTransactions = async (
  transactions: Collection = database.collection("transactions")
): Promise<Transaction[]> => {
  const transactionsList = await transactions.find().toArray();

  return transactionsList.map((transaction) => ({
    _id: transaction._id.toHexString(),
    account: transaction.account,
    toAccount: transaction.toAccount,
    amount: transaction.amount,
    code: transaction.code,
  }));
};
