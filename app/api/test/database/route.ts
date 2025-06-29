import { NextResponse } from "next/server"

interface TestDetails {
  [key: string]: any;
}

interface TestResult {
  name: string;
  status: string;
  details: TestDetails;
  error?: string;
}

interface TestResults {
  timestamp: string;
  tests: TestResult[];
  overall: string;
}

export async function GET() {
  console.log("🔍 STARTING COMPREHENSIVE DATABASE TEST")
  console.log("=".repeat(50))

  const results: TestResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    overall: "PENDING",
  }

  try {
    // Test 1: Environment Variables
    console.log("📋 Test 1: Environment Variables")
    const envTest: TestResult = {
      name: "Environment Variables",
      status: "PENDING",
      details: {},
    }

    envTest.details = {
      MONGODB_URI: process.env.MONGODB_URI ? "✅ Present" : "❌ Missing",
      JWT_SECRET: process.env.JWT_SECRET ? "✅ Present" : "❌ Missing",
      HOST_EMAIL: process.env.HOST_EMAIL ? "✅ Present" : "❌ Missing",
      HOST_EMAIL_PASSWORD: process.env.HOST_EMAIL_PASSWORD ? "✅ Present" : "❌ Missing",
    }

    if (!process.env.MONGODB_URI) {
      envTest.status = "FAILED"
      envTest.error = "MONGODB_URI is missing from environment variables"
      results.tests.push(envTest)
      results.overall = "FAILED"
      return NextResponse.json(results, { status: 500 })
    }

    envTest.status = "PASSED"
    results.tests.push(envTest)
    console.log("✅ Environment variables check passed")

    // Test 2: MongoDB Connection
    console.log("🔌 Test 2: MongoDB Connection")
    const connectionTest: TestResult = {
      name: "MongoDB Connection",
      status: "PENDING",
      details: {},
    }

    try {
      const { MongoClient } = await import("mongodb")
      const uri = process.env.MONGODB_URI!

      // Parse URI for logging
      const url = new URL(uri)
      connectionTest.details.protocol = url.protocol
      connectionTest.details.host = url.hostname
      connectionTest.details.database = url.pathname.substring(1)
      connectionTest.details.username = url.username

      console.log(`Connecting to: ${url.hostname}`)
      console.log(`Database: ${url.pathname.substring(1)}`)
      console.log(`Username: ${url.username}`)

      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: "majority",
        maxPoolSize: 10,
        minPoolSize: 1,
      })

      await client.connect()
      console.log("✅ MongoDB connection established")

      // Test ping
      const pingResult = await client.db("admin").command({ ping: 1 })
      connectionTest.details.ping = pingResult.ok === 1 ? "SUCCESS" : "FAILED"
      console.log("✅ Ping successful")

      // Test database access
      const db = client.db("loginDB")
      const collections = await db.listCollections().toArray()
      connectionTest.details.collections = collections.map((c) => c.name)
      connectionTest.details.collectionCount = collections.length
      console.log(`✅ Database accessible with ${collections.length} collections`)

      await client.close()
      connectionTest.status = "PASSED"
      console.log("✅ Connection closed properly")
    } catch (error: any) {
      console.error("❌ MongoDB connection failed:", error.message)
      connectionTest.status = "FAILED"
      connectionTest.error = error.message
      connectionTest.details.errorType = error.constructor.name
      connectionTest.details.errorCode = error.code

      // Specific error analysis
      if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
        connectionTest.details.issue = "AUTHENTICATION_FAILED"
        connectionTest.details.solution = [
          "Check username 'Ankushh' spelling",
          "Verify password 'ankush66'",
          "Go to MongoDB Atlas → Database Access",
          "Ensure user has readWrite permissions on loginDB",
        ]
      } else if (error.message.includes("network") || error.message.includes("ENOTFOUND")) {
        connectionTest.details.issue = "NETWORK_ERROR"
        connectionTest.details.solution = [
          "Check internet connection",
          "Go to MongoDB Atlas → Network Access",
          "Add IP 0.0.0.0/0 for testing",
          "Verify cluster is running",
        ]
      } else if (error.message.includes("timeout")) {
        connectionTest.details.issue = "TIMEOUT_ERROR"
        connectionTest.details.solution = [
          "Check network latency",
          "Verify cluster performance",
          "Try different network",
        ]
      }
    }

    results.tests.push(connectionTest)

    // Test 3: CRUD Operations (only if connection passed)
    if (connectionTest.status === "PASSED") {
      console.log("🧪 Test 3: CRUD Operations")
      const crudTest: TestResult = {
        name: "CRUD Operations",
        status: "PENDING",
        details: {},
      }

      try {
        const { MongoClient } = await import("mongodb")
        const client = new MongoClient(process.env.MONGODB_URI!, {
          serverSelectionTimeoutMS: 10000,
        })

        await client.connect()
        const db = client.db("loginDB")
        const testCollection = db.collection("connection_test")

        // Insert
        const insertResult = await testCollection.insertOne({
          test: "crud_test",
          timestamp: new Date(),
          message: "CRUD test from ThinkGreen",
        })
        crudTest.details.insert = insertResult.insertedId ? "SUCCESS" : "FAILED"

        // Read
        const document = await testCollection.findOne({ test: "crud_test" })
        crudTest.details.read = document ? "SUCCESS" : "FAILED"

        // Update
        const updateResult = await testCollection.updateOne(
          { test: "crud_test" },
          { $set: { updated: true, updateTime: new Date() } },
        )
        crudTest.details.update = updateResult.modifiedCount > 0 ? "SUCCESS" : "FAILED"

        // Delete
        const deleteResult = await testCollection.deleteOne({ test: "crud_test" })
        crudTest.details.delete = deleteResult.deletedCount > 0 ? "SUCCESS" : "FAILED"

        await client.close()
        crudTest.status = "PASSED"
        console.log("✅ CRUD operations successful")
      } catch (error: any) {
        console.error("❌ CRUD operations failed:", error.message)
        crudTest.status = "FAILED"
        crudTest.error = error.message
      }

      results.tests.push(crudTest)
    }

    // Test 4: Authentication Functions
    console.log("🔐 Test 4: Authentication Functions")
    const authTest: TestResult = {
      name: "Authentication Functions",
      status: "PENDING",
      details: {},
    }

    try {
      const bcrypt = await import("bcryptjs")
      const jwt = await import("jsonwebtoken")

      // Test password hashing
      const testPassword = "testpassword123"
      const hashedPassword = await bcrypt.hash(testPassword, 12)
      const isValidPassword = await bcrypt.compare(testPassword, hashedPassword)
      authTest.details.passwordHashing = isValidPassword ? "SUCCESS" : "FAILED"

      // Test JWT
      const testPayload = { userId: "test123", email: "test@thinkgreen.com" }
      const token = jwt.sign(testPayload, process.env.JWT_SECRET!, { expiresIn: "1h" })
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      authTest.details.jwtOperations = decoded.userId === "test123" ? "SUCCESS" : "FAILED"

      authTest.status = "PASSED"
      console.log("✅ Authentication functions working")
    } catch (error: any) {
      console.error("❌ Authentication test failed:", error.message)
      authTest.status = "FAILED"
      authTest.error = error.message
    }

    results.tests.push(authTest)

    // Test 5: Email Configuration
    console.log("📧 Test 5: Email Configuration")
    const emailTest: TestResult = {
      name: "Email Configuration",
      status: "PENDING",
      details: {},
    }

    try {
      const nodemailer = await import("nodemailer")

      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.HOST_EMAIL_PASSWORD,
        },
      })

      await transporter.verify()
      emailTest.details.transporterVerification = "SUCCESS"
      emailTest.status = "PASSED"
      console.log("✅ Email configuration valid")
    } catch (error: any) {
      console.error("❌ Email test failed:", error.message)
      emailTest.status = "FAILED"
      emailTest.error = error.message
      emailTest.details.transporterVerification = "FAILED"
    }

    results.tests.push(emailTest)

    // Determine overall status
    const failedTests = results.tests.filter((test) => test.status === "FAILED")
    results.overall = failedTests.length === 0 ? "PASSED" : "FAILED"

    console.log(`\n🎯 OVERALL RESULT: ${results.overall}`)
    console.log(`✅ Passed: ${results.tests.filter((t) => t.status === "PASSED").length}`)
    console.log(`❌ Failed: ${failedTests.length}`)

    if (failedTests.length > 0) {
      console.log("\n🔧 FAILED TESTS:")
      failedTests.forEach((test) => {
        console.log(`   • ${test.name}: ${test.error}`)
      })
    }

    return NextResponse.json(results, {
      status: results.overall === "PASSED" ? 200 : 500,
    })
  } catch (error: any) {
    console.error("💥 Test execution failed:", error)
    results.overall = "ERROR"
    results.tests.push({
      name: "Test Execution",
      status: "FAILED",
      error: error.message,
      details: {},
    })

    return NextResponse.json(results, { status: 500 })
  }
}
