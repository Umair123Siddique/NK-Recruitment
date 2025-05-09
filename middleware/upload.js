const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const fileExt = path.extname(file.originalname)
    const fileName = `${uuidv4()}${fileExt}`
    cb(null, fileName)
  },
})

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only PDF and Word documents
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type. Only PDF and Word documents are allowed."), false)
  }
}

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
})

// Middleware to handle file upload errors
const handleUploadErrors = (req, res, next) => {
  const cvUpload = upload.single("cvFile")

  cvUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File too large. Maximum size is 5MB.",
        })
      }
      return res.status(400).json({ message: err.message })
    } else if (err) {
      // An unknown error occurred
      return res.status(400).json({ message: err.message })
    }
    // Everything went fine
    next()
  })
}

module.exports = { handleUploadErrors }
