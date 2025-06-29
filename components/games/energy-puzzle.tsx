"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Lightbulb, Trophy } from "lucide-react"

type Cell = {
  id: number
  type: "source" | "path" | "destination"
  connected: boolean
  rotation: 0 | 90 | 180 | 270
  shape: "I" | "L" | "T" | "+"
}

export default function EnergyPuzzle() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [grid, setGrid] = useState<Cell[][]>([])
  const [timeLeft, setTimeLeft] = useState(120)
  const [highScore, setHighScore] = useState(0)
  const { toast } = useToast()

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLevel(1)
    setTimeLeft(120)
    generateGrid(1)
  }

  // End game
  const endGame = async () => {
    setGameStarted(false)
    setGameOver(true)

    if (score > highScore) {
      setHighScore(score)
    }

    try {
      const response = await fetch("/api/games/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: "energy-puzzle", score }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Score Saved!",
          description: `You earned ${data.pointsEarned} sustainability points!`,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Failed to save score:", error)
    }
  }

  // Generate grid
  const generateGrid = (level: number) => {
    const size = Math.min(3 + Math.floor(level / 2), 8)
    const newGrid: Cell[][] = []

    // Create empty grid
    for (let i = 0; i < size; i++) {
      newGrid.push([])
      for (let j = 0; j < size; j++) {
        newGrid[i].push({
          id: i * size + j,
          type: "path",
          connected: false,
          rotation: [0, 90, 180, 270][Math.floor(Math.random() * 4)] as 0 | 90 | 180 | 270,
          shape: ["I", "L", "T", "+"][Math.floor(Math.random() * 4)] as "I" | "L" | "T" | "+",
        })
      }
    }

    // Place source (always on the left edge)
    const sourceRow = Math.floor(Math.random() * size)
    newGrid[sourceRow][0] = {
      id: sourceRow * size,
      type: "source",
      connected: true,
      rotation: 90,
      shape: "I",
    }

    // Place destination (always on the right edge)
    const destRow = Math.floor(Math.random() * size)
    newGrid[destRow][size - 1] = {
      id: destRow * size + (size - 1),
      type: "destination",
      connected: false,
      rotation: 270,
      shape: "I",
    }

    setGrid(newGrid)
  }

  // Rotate cell
  const rotateCell = (rowIndex: number, colIndex: number) => {
    if (!gameStarted || gameOver) return

    const newGrid = [...grid]
    const cell = newGrid[rowIndex][colIndex]

    if (cell.type === "source" || cell.type === "destination") return

    // Rotate
    cell.rotation = ((cell.rotation + 90) % 360) as 0 | 90 | 180 | 270

    // Update grid
    newGrid[rowIndex][colIndex] = cell
    setGrid(newGrid)

    // Check connections
    checkConnections()
  }

  // Check if all paths are connected
  const checkConnections = () => {
    const newGrid = [...grid]
    const size = grid.length

    // Reset connections
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j].type !== "source") {
          newGrid[i][j].connected = false
        }
      }
    }

    // Find source
    let sourceRow = -1
    let sourceCol = -1

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j].type === "source") {
          sourceRow = i
          sourceCol = j
          break
        }
      }
      if (sourceRow !== -1) break
    }

    // Trace connections from source
    traceConnections(newGrid, sourceRow, sourceCol)

    // Check if destination is connected
    let levelComplete = false
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j].type === "destination" && newGrid[i][j].connected) {
          levelComplete = true
          break
        }
      }
      if (levelComplete) break
    }

    // Update grid
    setGrid(newGrid)

    // Level complete
    if (levelComplete) {
      const levelScore = 10 * level
      setScore((prev) => prev + levelScore)
      setLevel((prev) => prev + 1)

      toast({
        title: "Level Complete!",
        description: `You earned ${levelScore} points. Moving to level ${level + 1}!`,
        variant: "default",
      })

      // Generate new grid for next level
      generateGrid(level + 1)
    }
  }

  // Trace connections recursively
  const traceConnections = (grid: Cell[][], row: number, col: number) => {
    const size = grid.length
    const cell = grid[row][col]

    // Check connections in all four directions based on cell type and rotation
    const connections = getConnections(cell)

    for (const [dr, dc] of connections) {
      const newRow = row + dr
      const newCol = col + dc

      // Check if within bounds
      if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) continue

      const nextCell = grid[newRow][newCol]
      if (nextCell.connected) continue

      // Check if the next cell connects back to this cell
      const nextConnections = getConnections(nextCell)
      if (nextConnections.some(([ndr, ndc]) => newRow + ndr === row && newCol + ndc === col)) {
        nextCell.connected = true
        traceConnections(grid, newRow, newCol)
      }
    }
  }

  // Get connections based on cell type and rotation
  const getConnections = (cell: Cell): [number, number][] => {
    const { shape, rotation } = cell

    switch (shape) {
      case "I":
        if (rotation === 0 || rotation === 180)
          return [
            [-1, 0],
            [1, 0],
          ]
        return [
          [0, -1],
          [0, 1],
        ]
      case "L":
        if (rotation === 0)
          return [
            [0, 1],
            [1, 0],
          ]
        if (rotation === 90)
          return [
            [0, 1],
            [-1, 0],
          ]
        if (rotation === 180)
          return [
            [0, -1],
            [-1, 0],
          ]
        return [
          [0, -1],
          [1, 0],
        ]
      case "T":
        if (rotation === 0)
          return [
            [-1, 0],
            [0, -1],
            [0, 1],
          ]
        if (rotation === 90)
          return [
            [-1, 0],
            [1, 0],
            [0, 1],
          ]
        if (rotation === 180)
          return [
            [1, 0],
            [0, -1],
            [0, 1],
          ]
        return [
          [-1, 0],
          [1, 0],
          [0, -1],
        ]
      case "+":
        return [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]
      default:
        return []
    }
  }

  // Render cell
  const renderCell = (cell: Cell, rowIndex: number, colIndex: number) => {
    const { type, connected, rotation, shape } = cell

    let bgColor = "bg-gray-200"
    if (connected) {
      bgColor = "bg-green-200"
    }

    if (type === "source") {
      bgColor = "bg-yellow-400"
    } else if (type === "destination") {
      bgColor = connected ? "bg-green-500" : "bg-red-500"
    }

    return (
      <div
        key={cell.id}
        className={`w-12 h-12 ${bgColor} rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105`}
        onClick={() => rotateCell(rowIndex, colIndex)}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {renderShape(shape)}
      </div>
    )
  }

  // Render shape
  const renderShape = (shape: Cell["shape"]) => {
    switch (shape) {
      case "I":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-2 h-full bg-gray-800"></div>
          </div>
        )
      case "L":
        return (
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-1/2 h-2 bg-gray-800 transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 w-2 h-1/2 bg-gray-800 transform -translate-x-1/2"></div>
          </div>
        )
      case "T":
        return (
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 w-2 h-1/2 bg-gray-800 transform -translate-x-1/2"></div>
          </div>
        )
      case "+":
        return (
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-800 transform -translate-x-1/2"></div>
          </div>
        )
      default:
        return null
    }
  }

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver])

  return (
    <Card className="w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 text-gray-900">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          Energy Puzzle
        </CardTitle>
        <CardDescription className="text-center text-gray-900">
          Connect the power source to the destination by rotating the path pieces!
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!gameStarted && !gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">How to Play</h3>
            <p className="mb-6">
              Click on path pieces to rotate them and create a continuous path from the power source (yellow) to the
              destination (red). Complete levels to earn points!
            </p>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
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
              <p className="text-lg mt-2">You reached level {level}</p>
            </div>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
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
                Level: <span className="text-blue-600">{level}</span>
              </div>
              <div className="text-lg font-bold">
                Time: <span className="text-red-600">{timeLeft}s</span>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}>
                {grid.map((row, rowIndex) => row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex)))}
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Click on pieces to rotate them. Connect the yellow source to the red destination!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
