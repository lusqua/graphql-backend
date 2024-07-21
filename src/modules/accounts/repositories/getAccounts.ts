import { database } from "../../../config/mongo";

export const getAccounts = async (
  filter = {},
  collection = database.collection("accounts")
) => {
  const findedAccount = await collection.find(filter).toArray();

  return findedAccount.map((account) => ({
    _id: account._id.toHexString(),
    name: account.name,
    balance: account.balance,
    email: account.email,
  }));
};
