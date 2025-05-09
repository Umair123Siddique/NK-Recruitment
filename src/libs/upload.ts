import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Types for file upload
export interface UploadedFile {
  filename: string
  originalName: string
  path: string
  size: number
  mimetype: string
}

// Ensure upload directory exists
export async function ensureUploadDir(): Promise<string> {
  const uploadDir = path.join(process.cwd(), "uploads")

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  return uploadDir
}

// Process and save uploaded file
export async function saveUploadedFile(file: File): Promise<UploadedFile | null> {
  try {
    const uploadDir = await ensureUploadDir()

    // Get file extension
    const originalName = file.name
    const fileExt = path.extname(originalName)

    // Create unique filename
    const filename = `${uuidv4()}${fileExt}`
    const filePath = path.join(uploadDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(filePath, buffer)

    return {
      filename,
      originalName,
      path: filePath,
      size: buffer.length,
      mimetype: file.type,
    }
  } catch (error) {
    console.error("Error saving file:", error)
    return null
  }
}

// Validate file type and size
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only PDF and Word documents are allowed.",
    }
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 5MB.",
    }
  }

  return { valid: true }
}
