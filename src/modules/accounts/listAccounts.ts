import { database } from "../../config/mongo";
import { AccountType } from "./type";

export const listAccounts = async (): Promise<AccountType[]> => {
  const accounts = database.collection("accounts");

  const findedAccount = await accounts.find().toArray();

  return findedAccount.map((account) => ({
    _id: account._id.toHexString(),
    name: account.name,
    balance: account.balance,
    email: account.email,
  }));
};
