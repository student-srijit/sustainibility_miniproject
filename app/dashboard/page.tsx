import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Trophy, User } from "lucide-react"

export default async function DashboardPage() {
  // Check authentication
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    redirect("/login")
  }

  const decoded = await verifyToken(token)
  if (!decoded || typeof decoded === "string") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {decoded.name || "User"}!</h1>
            <p className="text-xl text-gray-600">Track your sustainability journey and play games to earn points</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <User className="h-5 w-5 text-green-600" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-900">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{decoded.name || "User"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{decoded.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Gamepad2 className="h-5 w-5 text-blue-600" />
                  Sustainability Games
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-900">
                <div className="space-y-4">
                  <p className="text-gray-600">Play games to earn points and learn about sustainability!</p>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Link href="/games">Play Games</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-900">
                <div className="space-y-4">
                  <p className="text-gray-600">See how you rank against other sustainability champions!</p>
                  <Button asChild className="w-full bg-gradient-to-r from-yellow-600 to-amber-600">
                    <Link href="/leaderboard">View Leaderboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Sustainability Impact</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                <div className="text-gray-600">Trees Saved</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
                <div className="text-gray-600">CO₂ Reduced (kg)</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
                <div className="text-gray-600">Water Saved (L)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
