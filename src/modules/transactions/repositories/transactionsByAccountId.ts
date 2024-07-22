import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";
import { TransactionType } from "../type";
import { config } from "../../../config";

export const transactionsByAccountIdRepository = async (
  id: string,
  transactions: Collection = database.collection(
    config.collections.transactions
  )
): Promise<TransactionType[]> => {
  const parsedId = new ObjectId(id);

  const findedTransactions = await transactions
    .find({
      $or: [{ account: parsedId }, { targetAccount: parsedId }],
    })
    .toArray();

  return findedTransactions.map((transaction) => {
    const { _id, account, targetAccount, amount, code, createdAt } =
      transaction;

    return {
      _id: _id.toHexString(),
      account: account.toHexString(),
      targetAccount: targetAccount.toHexString(),
      amount,
      code,
      createdAt,
    };
  });
};
