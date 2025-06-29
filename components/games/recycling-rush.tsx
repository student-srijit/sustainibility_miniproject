"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Recycle, Trash2, Trophy } from "lucide-react"

type Item = {
  id: number
  type: "recyclable" | "trash"
  position: { x: number; y: number }
  element: string
}

const recyclableItems = ["Paper", "Cardboard", "Glass", "Plastic", "Metal", "Aluminum"]
const trashItems = ["Styrofoam", "Dirty Food Containers", "Used Tissues", "Diapers", "Broken Ceramics"]

export default function RecyclingRush() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [items, setItems] = useState<Item[]>([])
  const [highScore, setHighScore] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(60)
    setItems([])
  }

  // End game
  const endGame = async (finalScore: number) => {
    setGameStarted(false)
    setGameOver(true)

    if (finalScore > highScore) {
      setHighScore(finalScore)
    }

    try {
      console.log("🎮 Ending game, sending score:", finalScore)
      const response = await fetch("/api/games/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: "recycling-rush", score: finalScore }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Score Saved!",
          description: `You earned ${data.pointsEarned} sustainability points!`,
          variant: "success",
        })
      }
    } catch (error) {
      console.error("Failed to save score:", error)
    }
  }

  // Generate a new item
  const generateItem = () => {
    if (!gameAreaRef.current) return

    const gameArea = gameAreaRef.current.getBoundingClientRect()
    const isRecyclable = Math.random() > 0.4
    const itemType = isRecyclable ? "recyclable" : "trash"
    const itemElement = isRecyclable
      ? recyclableItems[Math.floor(Math.random() * recyclableItems.length)]
      : trashItems[Math.floor(Math.random() * trashItems.length)]

    const x = Math.random() * (gameArea.width - 100)
    const y = Math.random() * (gameArea.height - 100)

    const newItem: Item = {
      id: Date.now(),
      type: itemType,
      position: { x, y },
      element: itemElement,
    }

    setItems((prev) => [...prev, newItem])
  }

  // Handle item drop
  const handleDrop = (e: React.DragEvent, binType: "recyclable" | "trash") => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("itemId")
    const item = items.find((i) => i.id.toString() === itemId)

    if (item) {
      if (item.type === binType) {
        // Correct bin
        setScore((prev) => prev + 10)
        toast({
          title: "Correct!",
          description: `${item.element} goes in the ${binType} bin.`,
          variant: "success",
        })
      } else {
        // Wrong bin
        setScore((prev) => Math.max(0, prev - 5))
        toast({
          title: "Oops!",
          description: `${item.element} should go in the ${item.type} bin.`,
          variant: "destructive",
        })
      }

      // Remove item
      setItems((prev) => prev.filter((i) => i.id.toString() !== itemId))
    }
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    e.dataTransfer.setData("itemId", itemId.toString())
  }

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          endGame(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, score])

  // Generate items
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const itemInterval = setInterval(() => {
      if (items.length < 10) {
        generateItem()
      }
    }, 2000)

    return () => clearInterval(itemInterval)
  }, [gameStarted, gameOver, items.length])

  return (
    <Card className="w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 text-gray-900">
          <Recycle className="h-6 w-6 text-green-600" />
          Recycling Rush
        </CardTitle>
        <CardDescription className="text-center text-gray-900">
          Sort items into the correct bins as quickly as possible!
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!gameStarted && !gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">How to Play</h3>
            <p className="mb-6">
              Drag and drop items into the correct bin - recyclable or trash. You'll earn 10 points for correct sorting
              and lose 5 points for mistakes.
            </p>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Start Game
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-xl mb-1">
                Your Score: <span className="font-bold text-green-600">{score}</span>
              </p>
              <p className="text-sm">High Score: {highScore}</p>
            </div>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Play Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold">
                Score: <span className="text-green-600">{score}</span>
              </div>
              <div className="text-lg font-bold">
                Time: <span className="text-red-600">{timeLeft}s</span>
              </div>
            </div>

            <div
              ref={gameAreaRef}
              className="relative h-80 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className={`absolute cursor-grab active:cursor-grabbing p-2 rounded-lg ${
                    item.type === "recyclable" ? "bg-green-100" : "bg-red-100"
                  }`}
                  style={{
                    left: `${item.position.x}px`,
                    top: `${item.position.y}px`,
                  }}
                >
                  {item.element}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-24 bg-green-100 border-2 border-green-500 rounded-lg flex items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "recyclable")}
              >
                <div className="text-center">
                  <Recycle className="h-8 w-8 text-green-600 mx-auto" />
                  <p className="font-medium text-green-800">Recyclable</p>
                </div>
              </div>

              <div
                className="h-24 bg-red-100 border-2 border-red-500 rounded-lg flex items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "trash")}
              >
                <div className="text-center">
                  <Trash2 className="h-8 w-8 text-red-600 mx-auto" />
                  <p className="font-medium text-red-800">Trash</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {gameStarted && !gameOver && (
        <CardFooter>
          <Button onClick={() => endGame(score)} variant="outline" className="w-full">
            End Game
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
