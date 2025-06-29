"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: "PENDING" | "PASSED" | "FAILED"
  error?: string
  details?: any
}

interface TestResults {
  timestamp: string
  tests: TestResult[]
  overall: "PENDING" | "PASSED" | "FAILED" | "ERROR"
}

export default function TestPage() {
  const [results, setResults] = useState<TestResults | null>(null)
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch("/api/test/database")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Test failed:", error)
      setResults({
        timestamp: new Date().toISOString(),
        tests: [
          {
            name: "Test Execution",
            status: "FAILED",
            error: "Failed to execute tests",
          },
        ],
        overall: "ERROR",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASSED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "PENDING":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant = status === "PASSED" ? "default" : status === "FAILED" ? "destructive" : "secondary"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">🧪 Backend System Test</h1>
          <p className="text-gray-600 mb-6">
            Comprehensive testing of MongoDB connection, authentication, and all backend services
          </p>

          <Button onClick={runTests} disabled={loading} size="lg" className="mb-6">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Running Tests..." : "🚀 Run All Tests"}
          </Button>
        </div>

        {results && (
          <div className="space-y-6">
            {/* Overall Status */}
            <Card
              className={`border-2 ${
                results.overall === "PASSED"
                  ? "border-green-500"
                  : results.overall === "FAILED"
                    ? "border-red-500"
                    : "border-yellow-500"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(results.overall)}
                  Overall Test Result: {getStatusBadge(results.overall)}
                </CardTitle>
                <CardDescription>Test completed at: {new Date(results.timestamp).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {results.tests.filter((t) => t.status === "PASSED").length}
                    </div>
                    <div className="text-sm text-gray-600">Passed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {results.tests.filter((t) => t.status === "FAILED").length}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">{results.tests.length}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Test Results */}
            <div className="space-y-4">
              {results.tests.map((test, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {getStatusIcon(test.status)}
                        {test.name}
                      </span>
                      {getStatusBadge(test.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {test.error && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                        <p className="text-red-800 font-medium">Error:</p>
                        <p className="text-red-700">{test.error}</p>
                      </div>
                    )}

                    {test.details && (
                      <div className="space-y-2">
                        <p className="font-medium">Details:</p>
                        <div className="bg-gray-50 rounded p-3">
                          <pre className="text-sm overflow-x-auto">{JSON.stringify(test.details, null, 2)}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Troubleshooting Guide */}
            {results.overall !== "PASSED" && (
              <Card className="border-yellow-500 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />🔧 Troubleshooting Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">🔑 If Authentication Failed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Go to MongoDB Atlas → Database Access</li>
                      <li>Verify user 'Ankushh' exists with correct password</li>
                      <li>Ensure user has 'readWrite' permissions on 'loginDB'</li>
                      <li>Check if user account is enabled</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">🌐 If Network Error:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Go to MongoDB Atlas → Network Access</li>
                      <li>Add IP address 0.0.0.0/0 (allow all) for testing</li>
                      <li>Verify cluster is running (not paused)</li>
                      <li>Check internet connection</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">📧 If Email Error:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Verify Gmail credentials are correct</li>
                      <li>Enable 2-factor authentication on Gmail</li>
                      <li>Generate App Password for the application</li>
                      <li>Use App Password instead of regular password</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
