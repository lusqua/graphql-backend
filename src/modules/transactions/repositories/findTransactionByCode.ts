import { Collection } from "mongodb";
import { database } from "../../../config/mongo";
import { Transaction } from "../type";
import { config } from "../../../config";

export const findTransactionByCodeRepository = async (
  transactionCode: string,
  transactions: Collection = database.collection(
    config.collections.transactions
  )
): Promise<Transaction | null> => {
  const findedTransaction = await transactions.findOne({
    code: transactionCode,
  });

  if (!findedTransaction) return null;

  const { _id, account, targetAccount, amount, code, createdAt } =
    findedTransaction;

  return {
    _id: _id.toHexString(),
    account,
    targetAccount,
    amount,
    code,
    createdAt,
  };
};
