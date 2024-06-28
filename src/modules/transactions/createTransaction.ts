import { ObjectId } from "mongodb";
import { db } from "../../config/mongo";
import { createTransactionLock } from "./createTransactionLock";

type CreateTransactionArgs = {
  account: string;
  toAccount: string;
  amount: number;
};

type CreateTransactionResponse = {
  success: boolean;
  transaction: {
    _id: string;
    account: string;
    toAccount: string;
    amount: number;
    createdAt: Date;
  } | null;
  error: string | null;
};

export const createTransaction = async ({
  account,
  toAccount,
  amount,
}: CreateTransactionArgs): Promise<CreateTransactionResponse> => {
  const transactionLocks = db.collection("transactionsLocks");
  const transactions = db.collection("transactions");
  const users = db.collection("users");

  // validate if sender exists
  const user = await users.findOne({ _id: new ObjectId(account) });

  if (!user) {
    return {
      success: false,
      transaction: null,
      error: "User not found",
    };
  }

  // validated if receiver exists
  const toUser = await users.findOne({ _id: new ObjectId(toAccount) });

  if (!toUser) {
    return {
      success: false,
      transaction: null,
      error: "Receiver not found",
    };
  }

  // validate user account balance
  if (user.balance < amount) {
    return {
      success: false,
      transaction: null,
      error: "Insufficient balance",
    };
  }

  // validate transaction ammount
  if (amount < 0) {
    return {
      success: false,
      transaction: null,
      error: "Invalid amount",
    };
  }

  // lock user transaction
  const lockResult = await createTransactionLock(account, amount, toAccount);

  if (!lockResult.success || !lockResult.insertedId) {
    return {
      success: false,
      transaction: null,
      error: lockResult.error,
    };
  }

  // create transaction
  const transaction = await transactions.insertOne({
    account,
    toAccount,
    amount,
    createdAt: new Date(),
  });

  // change user account balance

  await users.updateOne({ _id: user._id }, { $inc: { balance: -amount } });

  // change toAccount balance

  await users.updateOne({ _id: toUser._id }, { $inc: { balance: amount } });

  // unlock user transaction

  await transactionLocks.deleteOne({
    _id: new ObjectId(lockResult.insertedId),
  });

  const createdTransaction = await transactions.findOne({
    _id: transaction.insertedId,
  });

  if (!createdTransaction) {
    throw new Error("Transaction not found");
  }

  return {
    success: true,
    transaction: {
      _id: createdTransaction._id.toHexString(),
      account: createdTransaction.account,
      toAccount: createdTransaction.toAccount,
      amount: createdTransaction.amount,
      createdAt: createdTransaction.createdAt,
    },
    error: null,
  };
};
