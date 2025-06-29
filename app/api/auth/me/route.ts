import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getUserById } from "@/lib/auth-service"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    console.log("🔍 Checking authentication status")
    
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      console.log("❌ No auth token found")
      return NextResponse.json(
        { message: "Not authenticated", authenticated: false },
        { status: 401 }
      )
    }

    console.log("🔑 Verifying token")
    const decoded = await verifyToken(token)
    if (!decoded || !decoded.userId) {
      console.log("❌ Invalid token")
      // Clear invalid token
      cookieStore.delete("auth-token")
      return NextResponse.json(
        { message: "Invalid token", authenticated: false },
        { status: 401 }
      )
    }

    console.log(`👤 Fetching user data for ID: ${decoded.userId}`)
    const user = await getUserById(decoded.userId)
    if (!user) {
      console.log("❌ User not found")
      // Clear invalid token
      cookieStore.delete("auth-token")
      return NextResponse.json(
        { message: "User not found", authenticated: false },
        { status: 404 }
      )
    }

    console.log("✅ Authentication successful")
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        points: user.points || 0,
        gamesPlayed: user.gamesPlayed || 0,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
    })
  } catch (error: any) {
    console.error("❌ Auth check error:", error)
    // Clear token on error
    cookies().delete("auth-token")
    return NextResponse.json(
      { 
        message: "Internal server error",
        authenticated: false,
        error: error.message 
      },
      { status: 500 }
    )
  }
}
