import { createTransactionLock } from "../../transaction-lockers/repositories/createTransactionLock";
import { AccountType } from "../../accounts/type";
import { findAccount } from "../../accounts/findAccount";
import { changeUserAccount } from "../../accounts/repositories/changeUserAccount";
import { deleteTransactionLocker } from "../../transaction-lockers/repositories/deleteTransactionLocker";
import { createTransaction } from "../repositories/createTransaction";
import { findTransactionById } from "../repositories/findTransactionById";
import { findTransactionByCode } from "../repositories/findTransactionByCode";

type CreateTransactionArgs = {
  account: string;
  targetAccount: string;
  amount: number;
  code: string;
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

export const makeTransaction = async ({
  account,
  targetAccount,
  amount,
  code,
}: CreateTransactionArgs): Promise<CreateTransactionResponse> => {
  // validate transaction ammount
  if (amount < 0) {
    return errorMessage("Invalid amount");
  }

  const findedTransaction = await findTransactionByCode(code);

  console.log(findedTransaction);

  if (findedTransaction) {
    return errorMessage("Transaction already exists");
  }

  // validate if sender exists
  const fromAccount = await findAccount(account);

  if (!fromAccount._id) {
    return errorMessage("Account not found");
  }

  // validated if receiver exists
  const toAccount = await findAccount(targetAccount);

  if (!toAccount._id) {
    return errorMessage("Receiver not found");
  }

  // validate user account balance
  if (!fromAccount.balance || fromAccount.balance < amount) {
    return errorMessage("Insufficient balance");
  }

  // lock user transaction
  const lockResult = await createTransactionLock(
    account,
    amount,
    targetAccount
  );

  if (!lockResult.success || !lockResult.insertedId) {
    return errorMessage(lockResult.error || "Transaction already in progress");
  }

  // create transaction
  const transactionId = await createTransaction({
    from: account,
    to: targetAccount,
    amount,
    code,
  });

  // change user account balance
  changeUserAccount(account, -amount);

  // change toAccount balance
  changeUserAccount(targetAccount, amount);

  // unlock user transaction
  await deleteTransactionLocker(lockResult.insertedId);

  const transaction = await findTransactionById(transactionId);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const updatedAccount = await findAccount(account);
  const updatedToAccount = await findAccount(targetAccount);

  return {
    success: true,
    transaction: {
      _id: transaction._id,
      account: transaction.account,
      toAccount: transaction.targetAccount,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
    },
    error: null,
    targetAccount: updatedToAccount,
    account: updatedAccount,
  };
};

function errorMessage(error: string): CreateTransactionResponse {
  return {
    success: false,
    transaction: null,
    error,
    targetAccount: null,
    account: null,
  };
}
