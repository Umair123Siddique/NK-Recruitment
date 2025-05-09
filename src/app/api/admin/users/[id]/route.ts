import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, isAdmin } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import UserModel from "@/src/models/User"

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    const user = await UserModel.findById(params.id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Prevent deleting yourself
    if (user._id.toString() === session.user.id) {
      return NextResponse.json({ message: "Cannot delete your own account" }, { status: 400 })
    }

    await user.deleteOne()

    return NextResponse.json({ message: "User removed" })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

// PUT /api/admin/users/[id] - Update a user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, role, password } = await request.json()

    // Connect to database
    await connectToDatabase()

    const user = await UserModel.findById(params.id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update user fields
    if (name) user.name = name
    if (role) user.role = role
    if (password) user.password = password

    await user.save()

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
