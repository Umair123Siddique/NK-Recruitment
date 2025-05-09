import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isRecruiterOrAdmin } from "@/libs/auth"
import { connectToDatabase } from "@/libs/db"
import ApplicationModel from "@/models/Application"
import fs from "fs"

// GET /api/applications/[id] - Get application by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    const application = await ApplicationModel.findById(params.id).select("-cvFile.path") // Don't send file path to client

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Get application error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

// DELETE /api/applications/[id] - Delete an application
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    const application = await ApplicationModel.findById(params.id)

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Delete CV file
    if (fs.existsSync(application.cvFile.path)) {
      fs.unlinkSync(application.cvFile.path)
    }

    await application.deleteOne()

    return NextResponse.json({ message: "Application removed" })
  } catch (error) {
    console.error("Delete application error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
