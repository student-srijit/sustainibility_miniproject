import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, saveGameScore } from "@/lib/auth-service"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  console.log("🎮 Save game score request received")

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { gameId, score } = await req.json()
    console.log(`🎯 Saving score for game ${gameId}: ${score}`)

    if (!gameId || typeof score !== "number") {
      return NextResponse.json({ message: "Invalid game data" }, { status: 400 })
    }

    const result = await saveGameScore(decoded.userId, gameId, score)

    console.log("✅ Game score saved successfully")
    return NextResponse.json({
      message: "Score saved successfully",
      ...result,
    })
  } catch (error) {
    console.error("❌ Save score error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
