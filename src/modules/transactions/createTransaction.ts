import { ObjectId } from "mongodb";
import { database } from "../../config/mongo";
import { createTransactionLock } from "./createTransactionLock";
import { AccountType } from "../accounts/type";
import { findAccount } from "../accounts/findAccount";

type CreateTransactionArgs = {
  account: string;
  targetAccount: string;
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
  account: AccountType | null;
  targetAccount: AccountType | null;
};

export const createTransaction = async ({
  account,
  targetAccount,
  amount,
}: CreateTransactionArgs): Promise<CreateTransactionResponse> => {
  const transactionLocks = database.collection("transactionsLocks");
  const transactions = database.collection("transactions");
  const accounts = database.collection("accounts");

  // validate transaction ammount
  if (amount < 0) {
    return {
      success: false,
      transaction: null,
      error: "Invalid amount",
      targetAccount: null,
      account: null,
    };
  }

  // validate if sender exists
  const fromAccount = await findAccount(account);

  if (!fromAccount._id) {
    return {
      success: false,
      transaction: null,
      error: "Account not found",
      targetAccount: null,
      account: null,
    };
  }

  // validated if receiver exists
  const toAccount = await findAccount(targetAccount);

  if (!toAccount._id) {
    return {
      success: false,
      transaction: null,
      error: "Receiver not found",
      targetAccount: null,
      account: null,
    };
  }

  // validate user account balance
  if (!fromAccount.balance || fromAccount.balance < amount) {
    return {
      success: false,
      transaction: null,
      error: "Insufficient balance",
      targetAccount: null,
      account: null,
    };
  }

  // lock user transaction
  const lockResult = await createTransactionLock(
    account,
    amount,
    targetAccount
  );

  if (!lockResult.success || !lockResult.insertedId) {
    return {
      success: false,
      transaction: null,
      error: lockResult.error,
      targetAccount: null,
      account: null,
    };
  }

  // create transaction
  const transaction = await transactions.insertOne({
    account,
    targetAccount,
    amount,
    createdAt: new Date(),
  });

  // change user account balance

  await accounts.updateOne(
    { _id: new ObjectId(account) },
    { $inc: { balance: -amount } }
  );

  // change toAccount balance

  await accounts.updateOne(
    { _id: new ObjectId(toAccount._id) },
    { $inc: { balance: amount } }
  );

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

  const updatedAccount = await findAccount(account);
  const updatedToAccount = await findAccount(targetAccount);

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
    targetAccount: updatedToAccount,
    account: updatedAccount,
  };
};
