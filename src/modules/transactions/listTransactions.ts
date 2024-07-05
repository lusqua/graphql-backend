import { database } from "../../config/mongo";

export async function listTransactions() {
  const transactions = database.collection("transactions");

  const findedTransactions = await transactions.find().toArray();

  return findedTransactions;
}
