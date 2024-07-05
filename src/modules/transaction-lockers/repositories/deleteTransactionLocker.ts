import { Collection, ObjectId } from "mongodb";
import { database } from "../../../config/mongo";

export const deleteTransactionLocker = async (
  id: string,
  lockers: Collection = database.collection("transactionLockers")
): Promise<boolean> => {
  const { deletedCount } = await lockers.deleteOne({
    _id: new ObjectId(id),
  });

  return deletedCount === 1;
};
