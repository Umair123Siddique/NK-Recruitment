const jwt = require("jsonwebtoken")
const User = require("../src/models/User")

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user by id
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Add user to request object
    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" })
    }
    console.error("Auth middleware error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." })
  }
}

// Middleware to check if user is admin or recruiter
exports.isRecruiterOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "recruiter")) {
    next()
  } else {
    res.status(403).json({ message: "Access denied. Recruiter or Admin role required." })
  }
}
