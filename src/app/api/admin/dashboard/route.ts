import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isRecruiterOrAdmin } from "@/libs/auth"
import { connectToDatabase } from "@/libs/db"
import ApplicationModel from "@/models/Application"

// GET /api/admin/dashboard - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isRecruiterOrAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get total applications count
    const totalApplications = await ApplicationModel.countDocuments()

    // Get applications by status
    const applicationsByStatus = await ApplicationModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ])

    // Get applications by position
    const applicationsByPosition = await ApplicationModel.aggregate([
      {
        $group: {
          _id: "$position",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ])

    // Get recent applications
    const recentApplications = await ApplicationModel.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .select("fullName email position status submittedAt")

    // Get applications by date (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const applicationsByDate = await ApplicationModel.aggregate([
      {
        $match: {
          submittedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$submittedAt" },
            month: { $month: "$submittedAt" },
            day: { $dayOfMonth: "$submittedAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ])

    // Format applications by date
    const formattedApplicationsByDate = applicationsByDate.map((item) => {
      const date = new Date(item._id.year, item._id.month - 1, item._id.day)
      return {
        date: date.toISOString().split("T")[0],
        count: item.count,
      }
    })

    return NextResponse.json({
      totalApplications,
      applicationsByStatus,
      applicationsByPosition,
      recentApplications,
      applicationsByDate: formattedApplicationsByDate,
    })
  } catch (error) {
    console.error("Dashboard statistics error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
