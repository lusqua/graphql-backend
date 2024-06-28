import { MongoClient } from "mongodb";
import { config } from "../config";

const uri = config.mongo.uri;

export const client = new MongoClient(uri);

export const connect = async () => {
  await client.connect();
  console.log("Connected to MongoDB");
};
