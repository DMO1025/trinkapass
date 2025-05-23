
// src/lib/mongodb.ts
import { MongoClient, type Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local or your deployment settings');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local or your deployment settings');
}

// Using a global variable to maintain a cached connection across hot reloads in development.
// This is not optimal for production but works for this context.
// In production, you might manage connections differently depending on your deployment (e.g., serverless functions).
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    try {
      // Ping the database to check if the connection is still alive
      await cachedClient.db(MONGODB_DB).command({ ping: 1 });
      // console.log("Using cached MongoDB connection");
      return { client: cachedClient, db: cachedDb };
    } catch (e) {
      // Connection might have timed out or been closed
      cachedClient = null;
      cachedDb = null;
      // console.log("Cached MongoDB connection lost, reconnecting...");
    }
  }

  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB!);

  cachedClient = client;
  cachedDb = db;

  // console.log("New MongoDB connection established");
  return { client, db };
}
