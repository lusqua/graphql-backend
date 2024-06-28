import { ObjectId } from "mongodb";
import { db } from "../../config/mongo";

export const findUser = async (userId: string) => {
  const users = db.collection("users");

  console.log("userId", userId);

  return await users.findOne({ _id: new ObjectId(userId) });
};
