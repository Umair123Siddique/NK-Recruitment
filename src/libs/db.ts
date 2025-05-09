import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nk-recruitment"

// Global variable to track connection status
let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(MONGODB_URI)
    isConnected = !!db.connections[0].readyState
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Failed to connect to database")
  }
}

export function disconnectFromDatabase() {
  if (!isConnected) {
    return
  }

  mongoose.disconnect()
  isConnected = false
  console.log("MongoDB disconnected")
}
