import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";

type CreateTransactionArgs = {
  amount: number;
  from: string;
  to: string;
  code: string;
};

export const createTransactionRepository = async (
  args: CreateTransactionArgs,
  transactions: Collection = database.collection("transactions")
): Promise<string> => {
  const { insertedId } = await transactions.insertOne({
    account: new ObjectId(args.from),
    targetAccount: new ObjectId(args.to),
    amount: args.amount,
    createdAt: new Date(),
    code: args.code,
  });

  return insertedId.toHexString();
};
