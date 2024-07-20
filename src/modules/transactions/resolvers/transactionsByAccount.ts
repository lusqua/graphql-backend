import DataLoader from "dataloader";
import { transactionsByAccountId } from "../repositories/transactionsByAccountId";
import { Transaction, TransactionType } from "../type";
import { batchAccountsByIds } from "../../accounts/repositories/batchAccountsByIds";

export const transactionsByAccount = async (
  id: string
): Promise<Transaction[]> => {
  const transactions = await transactionsByAccountId(id);

  const accountLoader = new DataLoader<string, any>((ids) =>
    batchAccountsByIds(ids)
  );

  return transactions.map((transaction: TransactionType) => {
    return {
      _id: transaction._id,
      account: () => {
        const accountId = transaction.account;
        return accountLoader.load(accountId);
      },
      targetAccount: () => {
        const accountId = transaction.targetAccount;
        return accountLoader.load(accountId);
      },
      amount: transaction.amount,
      code: transaction.code,
      createdAt: transaction.createdAt,
    };
  });
};
