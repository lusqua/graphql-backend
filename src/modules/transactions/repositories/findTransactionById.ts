import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";

export const findTransactionById = async (
  id: string,
  transactions: Collection = database.collection("transactions")
) => {
  const transaction = await transactions.findOne({
    _id: new ObjectId(id),
  });

  if (!transaction) return null;

  const { _id, account, toAccount, amount, code, createdAt } = transaction;

  return {
    _id: _id.toHexString(),
    account,
    toAccount,
    amount,
    code,
    createdAt,
  };
};
