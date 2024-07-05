import { Collection, ObjectId } from "mongodb";
import { database } from "../../config/mongo";
import { AccountType } from "./type";

export const findAccount = async (
  userId: string,
  accounts: Collection = database.collection("accounts")
): Promise<AccountType> => {
  const account = await accounts.findOne({ _id: new ObjectId(userId) });

  return {
    _id: account?._id.toHexString() || "",
    name: account?.name,
    balance: account?.balance,
  };
};
