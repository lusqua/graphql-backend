import { database } from "../../config/mongo";
import { AccountType } from "./type";

type CreateAccountArgs = {
  name: string;
  balance: Number;
};

export const createAccount = async ({
  name,
  balance,
}: CreateAccountArgs): Promise<AccountType> => {
  const accounts = database.collection("accounts");

  const result = await accounts.insertOne({ name, balance });

  const createdAccount = await accounts.findOne({ _id: result.insertedId });

  return {
    _id: result.insertedId.toHexString(),
    name: createdAccount?.name,
    balance: createdAccount?.balance,
    email: createdAccount?.email,
  };
};
