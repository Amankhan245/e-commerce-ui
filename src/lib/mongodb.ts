import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGODB_URI);

  console.log("MongoDB Connected Successfully");

  return mongoose.connection;
}

export default connectDB;
