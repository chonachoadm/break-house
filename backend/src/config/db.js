import { MongoClient } from "mongodb";

let db = null;

export async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("Connected to MongoDB");
  return db;
}

export function getDB() {
  return db;
}