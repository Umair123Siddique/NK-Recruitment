import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isRecruiterOrAdmin } from "@/libs/auth"
import { connectToDatabase } from "@/libs/db"
import ApplicationModel from "@/models/Application"
import { sendStatusUpdateEmail } from "@/libs/email"

// PUT /api/applications/[id]/status - Update application status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    // Validate status
    const validStatuses = ["New", "Reviewed", "Contacted", "Interviewed", "Rejected", "Hired"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    const application = await ApplicationModel.findById(params.id)

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Update status
    application.status = status
    application.lastUpdated = new Date()
    application.lastUpdatedBy = session.user.email

    await application.save()

    // Send status update email
    sendStatusUpdateEmail(application).catch(console.error)

    return NextResponse.json({
      message: "Application status updated",
      application: {
        id: application._id,
        status: application.status,
        lastUpdated: application.lastUpdated,
      },
    })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
