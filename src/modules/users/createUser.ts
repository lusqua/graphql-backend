import { db } from "../../config/mongo";

type CreateUserArgs = {
  name: string;
  balance: Number;
};

export const createUser = async ({ name, balance }: CreateUserArgs) => {
  const users = db.collection("users");

  const result = await users.insertOne({ name, balance });

  return await users.findOne({ _id: result.insertedId });
};
