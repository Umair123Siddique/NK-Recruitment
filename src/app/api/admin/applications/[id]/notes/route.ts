import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isRecruiterOrAdmin } from "@/libs/auth"
import { connectToDatabase } from "@/libs/db"
import ApplicationModel from "@/models/Application"

// POST /api/applications/[id]/notes - Add a note to an application
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ message: "Note text is required" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    const application = await ApplicationModel.findById(params.id)

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Add note
    application.notes.push({
      text,
      createdBy: session.user.email,
      createdAt: new Date(),
    })

    application.lastUpdated = new Date()
    application.lastUpdatedBy = session.user.email

    await application.save()

    return NextResponse.json({
      message: "Note added",
      note: application.notes[application.notes.length - 1],
    })
  } catch (error) {
    console.error("Add note error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
