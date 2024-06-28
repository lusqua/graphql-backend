import { db } from "../../config/mongo";

export const listUsers = async () => {
  const users = db.collection("users");

  return await users.find().toArray();
};
