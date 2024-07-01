import { database } from "../../config/mongo";

export function listTransactions() {
  const transactions = database.collection("transactions");

  const findedTransactions = transactions.find().toArray();

  return findedTransactions;
}
