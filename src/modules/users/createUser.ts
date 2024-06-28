import { client } from "../../config/mongo";

export const createUser = async (name: string) => {
  const testDb = client.db("test");
  const users = testDb.collection("users");

  console.log("la vem");

  const result = await users.insertOne({ name });

  return await users.findOne({ _id: result.insertedId });
};
