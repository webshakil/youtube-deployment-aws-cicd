import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const cluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DB_NAME;

const connectionString = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connection successful");
} catch (e) {
  console.error("Connection failed", e);
}

let db;
if (conn) {
  db = conn.db("integration_ninjas");
} else {
  throw new Error("Database connection was not established.");
}

export default db;
