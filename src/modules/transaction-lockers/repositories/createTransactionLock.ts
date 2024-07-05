import { database } from "../../../config/mongo";

type CreateTransactionResponse = {
  success: boolean;
  insertedId: string | null;
  error: string | null;
};

export const createTransactionLock = async (
  user: string,
  ammount: number,
  toAccount: string
): Promise<CreateTransactionResponse> => {
  const transactions = database.collection("transactionsLocks");

  await transactions.createIndex({ user: 1 }, { unique: true });

  try {
    const result = await transactions.insertOne({
      user,
      ammount,
      toAccount,
    });

    return {
      success: true,
      insertedId: result.insertedId.toHexString(),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      insertedId: null,
      error: "Transaction already in progress",
    };
  }
};
