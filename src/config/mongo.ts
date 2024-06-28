import { MongoClient } from "mongodb";
import { config } from "../config";

const uri = config.mongo.uri;
const database = config.mongo.database;

export const client = new MongoClient(uri);
export const db = client.db(database);

export const connect = async () => {
  await client.connect();
  console.log("Connected to MongoDB");
};
