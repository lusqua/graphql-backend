import { db } from "../../config/mongo";

export const createUser = async (name: string, balance: Number) => {
  const users = db.collection("users");

  const result = await users.insertOne({ name, balance });

  return await users.findOne({ _id: result.insertedId });
};
