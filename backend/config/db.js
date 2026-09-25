import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import mongoose from "mongoose";
import { seedInitialData } from "./seeder.js";

let mongodInstance = null;

const cleanupMongod = async () => {
  if (mongodInstance) {
    try {
      await mongodInstance.stop();
    } catch (_) {}
    mongodInstance = null;
  }
};

process.on("SIGINT", async () => {
  await cleanupMongod();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await cleanupMongod();
  process.exit(0);
});

process.once("SIGUSR2", async () => {
  await cleanupMongod();
  process.kill(process.pid, "SIGUSR2");
});

let cachedConnection = global.mongooseConnection;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;

  // Try external or configured URI first if specified and not default local port
  if (
    mongoUri &&
    !mongoUri.includes("127.0.0.1:27017") &&
    !mongoUri.includes("localhost:27017")
  ) {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      cachedConnection = conn;
      global.mongooseConnection = conn;
      await seedInitialData();
      return conn;
    } catch (error) {
      console.warn(
        `Could not connect to external MONGO_URI (${error.message}). Falling back to local embedded MongoDB...`
      );
      if (process.env.VERCEL) {
        throw error;
      }
    }
  }

  if (process.env.VERCEL) {
    if (mongoUri) {
      const conn = await mongoose.connect(mongoUri);
      cachedConnection = conn;
      global.mongooseConnection = conn;
      return conn;
    }
    console.warn("No MONGO_URI provided in Vercel environment.");
    return;
  }

  // Try standard local MongoDB port 27017
  try {
    const conn = await mongoose.connect(
      mongoUri || "mongodb://127.0.0.1:27017/petshop",
      {
        serverSelectionTimeoutMS: 1500,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    cachedConnection = conn;
    global.mongooseConnection = conn;
    await seedInitialData();
    return conn;
  } catch (err) {
    // Port 27017 not listening; start embedded persistent local instance
    try {
      // Clean up orphaned instances before starting
      try {
        execSync('pkill -f "mongod-x64-darwin" || true', { stdio: "ignore" });
      } catch (_) {}

      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const dbPath = path.resolve("./.data/db");
      if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
      }

      // If mongod.lock exists but no process is running, remove it
      const lockFile = path.join(dbPath, "mongod.lock");
      if (fs.existsSync(lockFile)) {
        try {
          fs.unlinkSync(lockFile);
        } catch (_) {}
      }

      mongodInstance = await MongoMemoryServer.create({
        instance: {
          dbPath: dbPath,
          storageEngine: "wiredTiger",
        },
      });

      const localUri = `${mongodInstance.getUri()}petshop`;
      const conn = await mongoose.connect(localUri);
      console.log(
        `MongoDB Connected (Local Embedded Instance): ${conn.connection.host}`
      );
      await seedInitialData();
    } catch (embeddedErr) {
      console.error(`MongoDB connection error: ${embeddedErr.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
