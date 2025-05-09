import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isRecruiterOrAdmin } from "@/libs/auth"
import { connectToDatabase } from "@/libs/db"
import ApplicationModel from "@/models/Application"
import { saveUploadedFile, validateFile } from "@/libs/upload"
import { sendApplicationConfirmationEmail, sendNewApplicationNotification } from "@/libs/email"

// POST /api/applications - Submit a new application
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()

    // Extract file
    const file = formData.get("cvFile") as File

    if (!file) {
      return NextResponse.json({ message: "CV file is required" }, { status: 400 })
    }

    // Validate file
    const fileValidation = validateFile(file)
    if (!fileValidation.valid) {
      return NextResponse.json({ message: fileValidation.error }, { status: 400 })
    }

    // Save file
    const savedFile = await saveUploadedFile(file)
    if (!savedFile) {
      return NextResponse.json({ message: "Failed to save CV file" }, { status: 500 })
    }

    // Extract other form fields
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const education = formData.get("education") as string
    const experience = formData.get("experience") as string
    const skills = formData.get("skills") as string
    const position = formData.get("position") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!fullName || !email || !phone || !education || !skills || !position) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Create new application
    const application = new ApplicationModel({
      fullName,
      email,
      phone,
      education,
      experience,
      skills,
      position,
      message,
      cvFile: savedFile,
    })

    await application.save()

    // Send confirmation emails
    sendApplicationConfirmationEmail(email, fullName).catch(console.error)
    sendNewApplicationNotification(application).catch(console.error)

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: application._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

// GET /api/applications - Get all applications with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const position = searchParams.get("position") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "submittedAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Connect to database
    await connectToDatabase()

    // Build query
    const query: any = {}

    // Add search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ]
    }

    // Add status filter
    if (status && status !== "All") {
      query.status = status
    }

    // Add position filter
    if (position && position !== "All") {
      query.position = position
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build sort object
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    // Execute query with pagination
    const applications = await ApplicationModel.find(query).sort(sort).skip(skip).limit(limit).select("-cvFile.path") // Don't send file path to client

    // Get total count for pagination
    const total = await ApplicationModel.countDocuments(query)

    // Get unique positions for filters
    const positions = await ApplicationModel.distinct("position")

    // Get unique statuses for filters
    const statuses = await ApplicationModel.distinct("status")

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      filters: {
        positions,
        statuses,
      },
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
