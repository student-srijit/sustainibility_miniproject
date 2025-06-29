"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Trophy, CheckCircle, XCircle } from "lucide-react"

type Question = {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What percentage of the Earth's water is freshwater?",
    options: ["10%", "5%", "2.5%", "1%"],
    correct: 2,
    explanation: "Only 2.5% of Earth's water is freshwater, and most of it is frozen in ice caps and glaciers.",
    category: "Water Conservation",
  },
  {
    id: 2,
    question: "Which renewable energy source has the fastest growing capacity worldwide?",
    options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
    correct: 0,
    explanation: "Solar energy has the fastest growing capacity, with installations increasing by over 20% annually.",
    category: "Renewable Energy",
  },
  {
    id: 3,
    question: "How long does it take for a plastic bottle to decompose in a landfill?",
    options: ["50 years", "100 years", "450 years", "1000 years"],
    correct: 2,
    explanation: "Plastic bottles can take up to 450 years to decompose, which is why recycling is so important.",
    category: "Waste Management",
  },
  {
    id: 4,
    question: "What is the most effective way to reduce your carbon footprint?",
    options: ["Recycling", "Using LED bulbs", "Reducing meat consumption", "Taking shorter showers"],
    correct: 2,
    explanation:
      "Reducing meat consumption, especially beef, has the largest impact on reducing personal carbon footprint.",
    category: "Carbon Footprint",
  },
  {
    id: 5,
    question: "Which country produces the most renewable energy?",
    options: ["China", "United States", "Germany", "India"],
    correct: 0,
    explanation: "China leads the world in renewable energy production, particularly in solar and wind power.",
    category: "Global Energy",
  },
  {
    id: 6,
    question: "What percentage of global greenhouse gas emissions come from transportation?",
    options: ["10%", "14%", "20%", "25%"],
    correct: 1,
    explanation: "Transportation accounts for approximately 14% of global greenhouse gas emissions.",
    category: "Transportation",
  },
  {
    id: 7,
    question: "How much energy can be saved by switching to LED bulbs?",
    options: ["25%", "50%", "75%", "90%"],
    correct: 2,
    explanation: "LED bulbs use about 75% less energy than traditional incandescent bulbs.",
    category: "Energy Efficiency",
  },
  {
    id: 8,
    question: "What is the main cause of deforestation globally?",
    options: ["Urban development", "Agriculture", "Logging", "Mining"],
    correct: 1,
    explanation: "Agriculture, particularly cattle ranching and crop farming, is the leading cause of deforestation.",
    category: "Deforestation",
  },
  {
    id: 9,
    question: "Which material has the highest recycling rate?",
    options: ["Paper", "Plastic", "Glass", "Steel"],
    correct: 3,
    explanation: "Steel has the highest recycling rate at over 80%, making it one of the most recycled materials.",
    category: "Recycling",
  },
  {
    id: 10,
    question: "What is the average temperature increase needed to trigger significant climate change effects?",
    options: ["0.5°C", "1°C", "1.5°C", "2°C"],
    correct: 2,
    explanation:
      "Scientists warn that 1.5°C of warming above pre-industrial levels could trigger significant climate effects.",
    category: "Climate Change",
  },
]

export default function EcoQuiz() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [highScore, setHighScore] = useState(0)
  const { toast } = useToast()

  // Start game
  const startGame = () => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffledQuestions)
    setGameStarted(true)
    setGameOver(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setTimeLeft(30)
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
        body: JSON.stringify({ gameId: "eco-quiz", score }),
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

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const isCorrect = answerIndex === questions[currentQuestion].correct
    if (isCorrect) {
      const points = Math.max(1, Math.floor(timeLeft / 3)) // More points for faster answers
      setScore((prev) => prev + points)
      toast({
        title: "Correct!",
        description: `+${points} points`,
        variant: "success",
      })
    } else {
      toast({
        title: "Incorrect",
        description: "Better luck next time!",
        variant: "destructive",
      })
    }
  }

  // Next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      endGame()
    }
  }

  // Question timer
  useEffect(() => {
    if (!gameStarted || gameOver || showExplanation) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - show explanation
          setShowExplanation(true)
          setSelectedAnswer(null)
          toast({
            title: "Time's Up!",
            description: "Moving to next question",
            variant: "destructive",
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, showExplanation, currentQuestion])

  // Auto advance after showing explanation
  useEffect(() => {
    if (showExplanation) {
      const timer = setTimeout(() => {
        nextQuestion()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showExplanation])

  const currentQ = questions[currentQuestion]

  return (
    <Card className="w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 text-gray-900">
          <Brain className="h-6 w-6 text-purple-600" />
          Eco Quiz Challenge
        </CardTitle>
        <CardDescription className="text-center text-gray-900">Test your sustainability knowledge and earn points!</CardDescription>
      </CardHeader>

      <CardContent>
        {!gameStarted && !gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">How to Play</h3>
            <p className="mb-6">
              Answer sustainability questions as quickly as possible. You'll earn more points for faster correct
              answers. Each question has a 30-second time limit.
            </p>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start Quiz
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-xl mb-1">
                Your Score: <span className="font-bold text-green-600">{score}</span>
              </p>
              <p className="text-sm">High Score: {highScore}</p>
              <p className="text-lg mt-2">You answered {score > 0 ? Math.floor(score / 5) : 0} questions correctly</p>
            </div>
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Play Again
            </Button>
          </div>
        ) : (
          currentQ && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">
                  Score: <span className="text-green-600">{score}</span>
                </div>
                <div className="text-lg font-bold">
                  Question {currentQuestion + 1}/{questions.length}
                </div>
                <div className="text-lg font-bold">
                  Time: <span className="text-red-600">{timeLeft}s</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 font-medium mb-2">{currentQ.category}</div>
                <h3 className="text-xl font-bold text-gray-900">{currentQ.question}</h3>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => {
                  let buttonClass =
                    "w-full p-4 text-left border-2 rounded-lg transition-all duration-300 hover:scale-105"

                  if (showExplanation) {
                    if (index === currentQ.correct) {
                      buttonClass += " bg-green-100 border-green-500 text-green-800"
                    } else if (index === selectedAnswer) {
                      buttonClass += " bg-red-100 border-red-500 text-red-800"
                    } else {
                      buttonClass += " bg-gray-100 border-gray-300 text-gray-600"
                    }
                  } else {
                    buttonClass += " bg-white border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option}</span>
                        {showExplanation && index === currentQ.correct && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showExplanation && index === selectedAnswer && index !== currentQ.correct && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showExplanation && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Explanation:</h4>
                  <p className="text-blue-800">{currentQ.explanation}</p>
                </div>
              )}

              {showExplanation && (
                <div className="text-center">
                  <Button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                </div>
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}
