import { client } from "../../config/mongo";

export const listUsers = async () => {
  const testDb = client.db("test");
  const users = testDb.collection("users");

  return await users.find().toArray();
};
