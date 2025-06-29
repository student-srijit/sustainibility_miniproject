"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecyclingRush from "@/components/games/recycling-rush"
import EnergyPuzzle from "@/components/games/energy-puzzle"
import EcoQuiz from "@/components/games/eco-quiz"
import { Recycle, Lightbulb, Brain, Trophy, Gamepad2 } from "lucide-react"

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState("recycling-rush")
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch("/api/user/game-stats")
        const data = await response.json()

        if (response.ok && data.stats) {
          let gamesPlayed = 0
          let points = 0
          data.stats.forEach((gameStat: any) => {
            gamesPlayed += gameStat.totalGames
            points += gameStat.totalPoints
          })
          setTotalGamesPlayed(gamesPlayed)
          setTotalPoints(points)
        }
      } catch (error) {
        console.error("Failed to fetch user game stats:", error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchUserStats()
  }, [])

  const games = [
    {
      id: "recycling-rush",
      title: "Recycling Rush",
      description: "Sort items into correct bins as fast as possible",
      icon: Recycle,
      color: "from-green-400 to-emerald-500",
      component: RecyclingRush,
    },
    {
      id: "energy-puzzle",
      title: "Energy Puzzle",
      description: "Connect power sources to destinations",
      icon: Lightbulb,
      color: "from-yellow-400 to-amber-500",
      component: EnergyPuzzle,
    },
    {
      id: "eco-quiz",
      title: "Eco Quiz",
      description: "Test your sustainability knowledge",
      icon: Brain,
      color: "from-purple-400 to-pink-500",
      component: EcoQuiz,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100 pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full shadow-2xl mb-6">
              <Gamepad2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sustainability
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Games
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about sustainability while having fun! Play games, earn points, and compete with others.
            </p>
          </div>

          {/* Game Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {games.map((game) => (
              <Card
                key={game.id}
                className={`cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  activeGame === game.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setActiveGame(game.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${game.color} rounded-full shadow-lg mb-4`}
                  >
                    <game.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{game.title}</CardTitle>
                  <CardDescription className="text-gray-900">{game.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Game Area */}
          <div className="mb-8">
            {games.map((game) => {
              const GameComponent = game.component
              return (
                <div key={game.id} className={activeGame === game.id ? "block" : "hidden"}>
                  <GameComponent />
                </div>
              )
            })}
          </div>

          {/* Game Stats */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2 text-gray-900">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Your Gaming Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-900">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">{loadingStats ? '-' : totalGamesPlayed}</div>
                  <div className="text-gray-600">Games Played</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{loadingStats ? '-' : totalPoints}</div>
                  <div className="text-gray-600">Total Points</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-gray-600">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
