import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { Transaction } from "../type";

export const findTransactionByCode = async (
  transactionCode: string,
  transactions: Collection = database.collection("transactions")
): Promise<Transaction | null> => {
  const findedTransaction = await transactions.findOne({
    code: transactionCode,
  });

  if (!findedTransaction) return null;

  const { _id, account, targetAccount, amount, code } = findedTransaction;

  return {
    _id: _id.toHexString(),
    account,
    targetAccount,
    amount,
    code,
  };
};
