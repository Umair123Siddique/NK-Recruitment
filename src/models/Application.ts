import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface INote {
  text: string
  createdBy: string // This can be either user ID or email
  createdAt: Date
}

export interface ICVFile {
  filename: string
  originalName: string
  path: string
  size: number
  mimetype: string
}

export interface IApplication extends Document {
  fullName: string
  email: string
  phone: string
  education: string
  experience: string
  skills: string
  position: string
  message: string
  cvFile: ICVFile
  status: "New" | "Reviewed" | "Contacted" | "Interviewed" | "Rejected" | "Hired"
  notes: INote[]
  submittedAt: Date
  lastUpdated: Date
  lastUpdatedBy: string // This can be either user ID or email
}

const NoteSchema = new Schema<INote>({
  text: String,
  createdBy: {
    type: String, // Changed to String
    // type: Schema.Types.ObjectId, // Removed ObjectId type
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const CVFileSchema = new Schema<ICVFile>({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
})

const ApplicationSchema = new Schema<IApplication>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  education: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    default: "",
  },
  skills: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  cvFile: {
    type: CVFileSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Reviewed", "Contacted", "Interviewed", "Rejected", "Hired"],
    default: "New",
  },
  notes: [NoteSchema],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedBy: {
    type: String, // Changed to String
    // type: Schema.Types.ObjectId, // Removed ObjectId type
    ref: "User",
  },
})

// Update the lastUpdated field before saving
ApplicationSchema.pre<IApplication>("save", function (next) {
  this.lastUpdated = new Date()
  next()
})

// Create indexes for better query performance
ApplicationSchema.index({ fullName: "text", email: "text", position: "text" })
ApplicationSchema.index({ status: 1 })
ApplicationSchema.index({ submittedAt: -1 })

// Check if model already exists to prevent overwriting during hot reloads in development
const ApplicationModel: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema)

export default ApplicationModel
