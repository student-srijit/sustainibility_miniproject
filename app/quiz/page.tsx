"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "What percentage of the Earth's energy comes from the sun?",
      options: ["50%", "75%", "99.97%", "25%"],
      correct: 2,
      explanation: "The sun provides 99.97% of Earth's energy, making solar power an incredibly abundant resource.",
    },
    {
      question: "How much energy can be saved by switching to LED bulbs?",
      options: ["25%", "50%", "75%", "90%"],
      correct: 2,
      explanation: "LED bulbs use about 75% less energy than traditional incandescent bulbs and last much longer.",
    },
    {
      question: "What is the most recycled material in the world?",
      options: ["Paper", "Plastic", "Glass", "Steel"],
      correct: 3,
      explanation: "Steel is the most recycled material globally, with recycling rates often exceeding 80%.",
    },
    {
      question: "Wind turbines typically start generating electricity at what wind speed?",
      options: ["3-4 mph", "6-9 mph", "12-15 mph", "20-25 mph"],
      correct: 1,
      explanation: "Most wind turbines start generating electricity at wind speeds of 6-9 mph (cut-in speed).",
    },
    {
      question: "What percentage of global greenhouse gas emissions come from buildings?",
      options: ["20%", "30%", "40%", "50%"],
      correct: 2,
      explanation:
        "Buildings account for approximately 40% of global greenhouse gas emissions through energy consumption.",
    },
  ]

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    selectedAnswers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correct) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setScore(0)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-bold text-gray-900 mb-4">Quiz Results</CardTitle>
                <div className="text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {score}/{questions.length}
                  </span>
                </div>
                <p className="text-xl text-gray-600">
                  {score === questions.length
                    ? "Perfect! You're a sustainability expert!"
                    : score >= questions.length * 0.8
                      ? "Excellent! You know your sustainability facts!"
                      : score >= questions.length * 0.6
                        ? "Good job! Keep learning about sustainability!"
                        : "Keep studying! There's always more to learn about sustainability!"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6 text-gray-900">
                {questions.map((question, index) => {
                  const userAnswer = Number.parseInt(selectedAnswers[index])
                  const isCorrect = userAnswer === question.correct

                  return (
                    <div key={index} className="p-6 rounded-lg bg-gray-50 border">
                      <div className="flex items-start space-x-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Your answer:{" "}
                            <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                              {question.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-gray-600 mb-2">
                              Correct answer:{" "}
                              <span className="text-green-600">{question.options[question.correct]}</span>
                            </p>
                          )}
                          <p className="text-sm text-gray-500 italic">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="text-center pt-6">
                  <Button
                    onClick={resetQuiz}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Take Quiz Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Sustainability Quiz</h1>
            <p className="text-xl text-gray-600">Test your knowledge about renewable energy and sustainability</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">{questions[currentQuestion].question}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 text-gray-900">
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
