import { type NextRequest, NextResponse } from "next/server";
import { verifyToken, getUserGameStats } from "@/lib/auth-service";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'; // Ensure this route is dynamic

export async function GET(req: NextRequest) {
  console.log("📊 User game stats request received");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      console.log("❌ User not authenticated");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      console.log("❌ Invalid token");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    console.log(`Fetching game stats for user: ${userId}`);

    const userStats = await getUserGameStats(userId);

    if (!userStats) {
        console.log(`No game stats found for user: ${userId}`);
        return NextResponse.json({ message: "No stats found", stats: [] }, { status: 200 });
    }

    console.log(`✅ Game stats retrieved successfully for user ${userId}`);
    return NextResponse.json({ stats: userStats });

  } catch (error) {
    console.error("❌ User game stats error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
