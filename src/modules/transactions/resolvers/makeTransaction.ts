import { createTransactionLock } from "../../transaction-lockers/repositories/createTransactionLock";
import { accountType, AccountType } from "../../accounts/type";
import { findAccount } from "../../accounts/resolvers/findAccount";
import { changeUserAccount } from "../../accounts/repositories/changeUserAccount";
import { deleteTransactionLocker } from "../../transaction-lockers/repositories/deleteTransactionLocker";
import { createTransactionRepository } from "../repositories/createTransaction";
import { findTransactionByIdRepository } from "../repositories/findTransactionById";
import { findTransactionByCodeRepository } from "../repositories/findTransactionByCode";
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import { transactionType } from "../type";

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

  const findedTransaction = await findTransactionByCodeRepository(code);

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
  const transactionId = await createTransactionRepository({
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

  const transaction = await findTransactionByIdRepository(transactionId);

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

export const CreateTransactionInputType = new GraphQLInputObjectType({
  name: "CreateTransactionInput",
  fields: () => ({
    code: {
      type: GraphQLString,
    },
    account: {
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    targetAccount: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const CreateTransactionPayloadType = new GraphQLObjectType({
  name: "CreateTransactionPayload",
  fields: () => ({
    success: {
      type: GraphQLBoolean,
    },
    account: {
      type: accountType,
    },
    transaction: {
      type: transactionType,
    },
    targetAccount: {
      type: accountType,
    },
    error: {
      type: GraphQLString,
    },
  }),
});

export const CreateTransaction: GraphQLFieldConfig<null, null> = {
  type: CreateTransactionPayloadType,
  description: "Create a new transaction",
  args: {
    input: {
      type: CreateTransactionInputType,
    },
  },
  resolve: async (_, args) => {
    const transaction = await makeTransaction(args.input);
    return transaction;
  },
};
