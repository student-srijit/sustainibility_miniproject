import { type NextRequest, NextResponse } from "next/server"
import { getLeaderboard } from "@/lib/auth-service"
import { testConnection } from "@/lib/mongodb"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  console.log("🏆 Leaderboard request received")

  try {
    // Test database connection
    const dbConnected = await testConnection()
    if (!dbConnected) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 503 })
    }

    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const leaderboard = await getLeaderboard(limit)

    console.log("✅ Leaderboard retrieved successfully")
    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("❌ Leaderboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
