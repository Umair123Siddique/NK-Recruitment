import mongoose from "mongoose"
import bcrypt from "bcryptjs"
// import { config } from "dotenv"

// Load environment variables
// config({ path: ".env.local" })

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nk-recruitment"

// Admin user data
const adminUser = {
  email: "admin@nkrecruitment.com",
  password: "admin123",
  name: "Admin User",
  role: "admin",
}

// Define User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "recruiter", "viewer"],
    default: "viewer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
})

// Create User model
const User = mongoose.model("User", UserSchema)

// Connect to MongoDB and seed admin user
async function seedAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: adminUser.email })

    if (existingUser) {
      console.log("Admin user already exists")
      await mongoose.disconnect()
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(adminUser.password, salt)

    // Create admin user
    const user = new User({
      email: adminUser.email,
      password: hashedPassword,
      name: adminUser.name,
      role: adminUser.role,
    })

    await user.save()
    console.log("Admin user created successfully")

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error seeding admin user:", error)
    process.exit(1)
  }
}

// Run the seed function
seedAdminUser()
