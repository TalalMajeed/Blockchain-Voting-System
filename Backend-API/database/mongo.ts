import mongoose from "mongoose";

let hasConnected = false;

export async function connectMongo(): Promise<void> {
  if (hasConnected) return;

  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error("Missing required env var: MONGODB_URL");
  }

  await mongoose.connect(mongoUrl);
  hasConnected = true;

  mongoose.connection.on("disconnected", () => {
    hasConnected = false;
  });
}
