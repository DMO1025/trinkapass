// src/lib/mongodb.ts
import { MongoClient, type Db } from 'mongodb';

// Variáveis globais para cache da conexão
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    try {
      // Verifica se a conexão cacheada ainda está ativa
      // O nome do banco é necessário aqui, mas MONGODB_DB pode não estar disponível ainda se não for o primeiro acesso.
      // Tentaremos ler do process.env, mas se não estiver, o ping pode falhar e forçar uma nova conexão.
      const dbNameForPing = process.env.MONGODB_DB || 'admin'; // 'admin' é um DB comum para ping
      await cachedClient.db(dbNameForPing).command({ ping: 1 });
      // console.log("Using cached MongoDB connection");
      return { client: cachedClient, db: cachedDb };
    } catch (e) {
      cachedClient = null;
      cachedDb = null;
      console.warn("Cached MongoDB connection lost or ping failed, attempting to reconnect...", e);
    }
  }

  // Acessar variáveis de ambiente APENAS quando uma nova conexão é necessária.
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined. Please check your environment variables.');
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local or your deployment settings');
  }

  if (!MONGODB_DB) {
    console.error('MONGODB_DB is not defined. Please check your environment variables.');
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local or your deployment settings');
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    // console.log("New MongoDB connection established");
    return { client, db };
  } catch (error) {
    console.error("Failed to establish new MongoDB connection:", error);
    if (error instanceof Error && error.message.includes('Authentication failed')) {
        console.error("MongoDB Authentication Failed: Check your username and password in MONGODB_URI.");
    }
    if (error instanceof Error && (error.message.includes('querySrv ENODATA') || error.message.includes('querySrv ESERVFAIL'))) {
        console.error("MongoDB DNS Resolution Failed: Check your MONGODB_URI or network/DNS settings. Ensure IP Whitelisting is correct on MongoDB Atlas if applicable.");
    }
    throw error;
  }
}
