import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";

export const changeUserAccount = async (
  userId: string,
  amount: number,
  accounts: Collection = database.collection("accounts")
) => {
  await accounts.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { balance: amount } }
  );
};
