"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown, RefreshCw } from "lucide-react"

type LeaderboardEntry = {
  _id: string
  name: string
  email: string
  points: number
  createdAt: string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchLeaderboard = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/leaderboard")
      const data = await response.json()

      if (response.ok) {
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</div>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600"
      case 2:
        return "from-gray-300 to-gray-500"
      case 3:
        return "from-amber-400 to-amber-600"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full shadow-2xl mb-6">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sustainability
              <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Champions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              See how you rank against other sustainability enthusiasts from around the world!
            </p>
            <Button
              onClick={fetchLeaderboard}
              disabled={refreshing}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              {refreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>

          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 2nd Place */}
              <div className="order-1 md:order-1">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Medal className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <div className="text-4xl font-bold text-gray-600">2nd</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">{leaderboard[1]?.name}</h3>
                      <div className="text-2xl font-bold text-gray-600">{leaderboard[1]?.points} pts</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 1st Place */}
              <div className="order-2 md:order-2">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-200 to-yellow-400 transform hover:scale-105 transition-all duration-300 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardContent className="p-6 text-center pt-8">
                    <div className="mb-4">
                      <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-2" />
                      <div className="text-5xl font-bold text-yellow-800">1st</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-yellow-900">{leaderboard[0]?.name}</h3>
                      <div className="text-3xl font-bold text-yellow-800">{leaderboard[0]?.points} pts</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3rd Place */}
              <div className="order-3 md:order-3">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-100 to-amber-200 transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Award className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                      <div className="text-4xl font-bold text-amber-700">3rd</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-amber-900">{leaderboard[2]?.name}</h3>
                      <div className="text-2xl font-bold text-amber-700">{leaderboard[2]?.points} pts</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Full Leaderboard */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No players yet!</h3>
                  <p className="text-gray-500">Be the first to play games and earn points.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1
                    return (
                      <div
                        key={entry._id}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          rank <= 3
                            ? `bg-gradient-to-r ${getRankColor(rank)} text-white border-transparent`
                            : "bg-white border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">{getRankIcon(rank)}</div>
                          <div>
                            <h4 className={`font-bold ${rank <= 3 ? "text-white" : "text-gray-900"}`}>{entry.name}</h4>
                            <p className={`text-sm ${rank <= 3 ? "text-white/80" : "text-gray-600"}`}>
                              Member since {new Date(entry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${rank <= 3 ? "text-white" : "text-gray-900"}`}>
                            {entry.points}
                          </div>
                          <div className={`text-sm ${rank <= 3 ? "text-white/80" : "text-gray-600"}`}>points</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{leaderboard.length}</div>
                <div className="text-gray-600">Total Players</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {leaderboard.reduce((sum, entry) => sum + (typeof entry.points === 'number' ? entry.points : 0), 0)}
                </div>
                <div className="text-gray-600">Total Points</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {leaderboard.length > 0
                    ? Math.round(leaderboard.reduce((sum, entry) => sum + (typeof entry.points === 'number' ? entry.points : 0), 0) / leaderboard.length)
                    : 0}
                </div>
                <div className="text-gray-600">Average Points</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
