import { ObjectId } from "mongodb";
import { database } from "../../config/mongo";
import { AccountType } from "./type";

export const findAccount = async (userId: string): Promise<AccountType> => {
  const accounts = database.collection("accounts");

  const account = await accounts.findOne({ _id: new ObjectId(userId) });

  return {
    _id: account?._id.toHexString() || "",
    name: account?.name,
    balance: account?.balance,
  };
};
