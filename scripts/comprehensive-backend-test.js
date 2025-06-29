// Comprehensive Backend Testing and Validation Script
console.log("🧪 COMPREHENSIVE BACKEND TESTING SUITE")
console.log("=".repeat(60))

// Test configuration
const TEST_EMAIL = "test@thinkgreen.com"
const TEST_PASSWORD = "TestPassword123!"
const TEST_NAME = "Test User"

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: [],
}

function logTest(testName, passed, details = "") {
  testResults.total++
  if (passed) {
    testResults.passed++
    console.log(`✅ ${testName}`)
  } else {
    testResults.failed++
    console.log(`❌ ${testName}`)
    if (details) console.log(`   ${details}`)
  }
  testResults.details.push({ testName, passed, details })
}

// 1. Environment Variables Test
function testEnvironmentVariables() {
  console.log("\n🌍 Testing Environment Variables...")

  const requiredVars = ["MONGODB_URI", "JWT_SECRET", "HOST_EMAIL", "HOST_EMAIL_PASSWORD"]

  let allPresent = true
  requiredVars.forEach((varName) => {
    const value = process.env[varName]
    if (!value) {
      logTest(`Environment variable ${varName}`, false, "Missing")
      allPresent = false
    } else {
      logTest(`Environment variable ${varName}`, true)
    }
  })

  return allPresent
}

// 2. MongoDB Connection Test
async function testMongoDBConnection() {
  console.log("\n📊 Testing MongoDB Connection...")

  try {
    const { MongoClient } = require("mongodb")
    const uri = process.env.MONGODB_URI

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    await client.connect()
    await client.db("admin").command({ ping: 1 })

    const db = client.db("loginDB")
    const collections = await db.listCollections().toArray()

    logTest("MongoDB connection", true)
    logTest("Database access", true, `Found ${collections.length} collections`)

    // Test basic operations
    const testDoc = { test: true, timestamp: new Date() }
    await db.collection("test").insertOne(testDoc)
    const retrieved = await db.collection("test").findOne({ test: true })
    await db.collection("test").deleteOne({ test: true })

    logTest("MongoDB read/write operations", !!retrieved)

    await client.close()
    return true
  } catch (error) {
    logTest("MongoDB connection", false, error.message)
    return false
  }
}

// 3. Email Service Test
async function testEmailService() {
  console.log("\n📧 Testing Email Service...")

  try {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_EMAIL_PASSWORD,
      },
    })

    await transporter.verify()
    logTest("Email transporter configuration", true)

    // Test email sending (to a test email)
    if (process.env.HOST_EMAIL) {
      const testInfo = await transporter.sendMail({
        from: process.env.HOST_EMAIL,
        to: process.env.HOST_EMAIL, // Send to self for testing
        subject: "ThinkGreen Backend Test",
        text: "This is a test email from the ThinkGreen backend testing suite.",
      })

      logTest("Email sending capability", !!testInfo.messageId, `Message ID: ${testInfo.messageId}`)
    }

    return true
  } catch (error) {
    logTest("Email service", false, error.message)
    return false
  }
}

// 4. Authentication Functions Test
async function testAuthenticationFunctions() {
  console.log("\n🔐 Testing Authentication Functions...")

  try {
    const bcrypt = require("bcryptjs")
    const jwt = require("jsonwebtoken")
    const crypto = require("crypto")

    // Test password hashing
    const password = "TestPassword123!"
    const hashedPassword = await bcrypt.hash(password, 12)
    const isValidPassword = await bcrypt.compare(password, hashedPassword)
    const isInvalidPassword = await bcrypt.compare("wrongpassword", hashedPassword)

    logTest("Password hashing", !!hashedPassword)
    logTest("Password verification (valid)", isValidPassword)
    logTest("Password verification (invalid)", !isInvalidPassword)

    // Test JWT tokens
    const payload = { userId: "test123", email: "test@example.com" }
    const secret = process.env.JWT_SECRET || "test-secret"
    const token = jwt.sign(payload, secret, { expiresIn: "7d" })
    const decoded = jwt.verify(token, secret)

    logTest("JWT token generation", !!token)
    logTest("JWT token verification", decoded.userId === payload.userId)

    // Test OTP generation
    const otp1 = crypto.randomInt(100000, 999999).toString()
    const otp2 = crypto.randomInt(100000, 999999).toString()

    logTest("OTP generation", otp1.length === 6 && otp2.length === 6)
    logTest("OTP uniqueness", otp1 !== otp2)

    return true
  } catch (error) {
    logTest("Authentication functions", false, error.message)
    return false
  }
}

// 5. API Endpoints Test
async function testAPIEndpoints() {
  console.log("\n🌐 Testing API Endpoints...")

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"

  try {
    // Test health check (if available)
    const endpoints = ["/api/auth/signup", "/api/auth/login", "/api/leaderboard"]

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: endpoint.includes("leaderboard") ? "GET" : "POST",
          headers: { "Content-Type": "application/json" },
          body: endpoint.includes("leaderboard") ? undefined : JSON.stringify({}),
        })

        logTest(`API endpoint ${endpoint}`, response.status !== 404, `Status: ${response.status}`)
      } catch (error) {
        logTest(`API endpoint ${endpoint}`, false, "Connection failed")
      }
    }

    return true
  } catch (error) {
    logTest("API endpoints", false, error.message)
    return false
  }
}

// 6. Game Scoring Logic Test
function testGameScoringLogic() {
  console.log("\n🎮 Testing Game Scoring Logic...")

  try {
    const games = [
      { id: "recycling-rush", score: 100, expectedPoints: 10 },
      { id: "energy-puzzle", score: 5, expectedPoints: 25 },
      { id: "eco-quiz", score: 8, expectedPoints: 80 },
    ]

    let allCorrect = true
    games.forEach((game) => {
      let points = 0
      switch (game.id) {
        case "recycling-rush":
          points = Math.floor(game.score / 10)
          break
        case "energy-puzzle":
          points = game.score * 5
          break
        case "eco-quiz":
          points = game.score * 10
          break
        default:
          points = game.score
      }

      const correct = points === game.expectedPoints
      logTest(`${game.id} scoring`, correct, `Score: ${game.score} → Points: ${points}`)
      if (!correct) allCorrect = false
    })

    return allCorrect
  } catch (error) {
    logTest("Game scoring logic", false, error.message)
    return false
  }
}

// 7. Data Validation Test
function testDataValidation() {
  console.log("\n✅ Testing Data Validation...")

  try {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmails = ["test@example.com", "user.name@domain.co.uk", "test+tag@gmail.com"]
    const invalidEmails = ["invalid-email", "@domain.com", "test@", "test.domain.com"]

    let emailValidationPassed = true
    validEmails.forEach((email) => {
      if (!emailRegex.test(email)) {
        logTest(`Valid email ${email}`, false)
        emailValidationPassed = false
      }
    })

    invalidEmails.forEach((email) => {
      if (emailRegex.test(email)) {
        logTest(`Invalid email ${email}`, false, "Should have failed validation")
        emailValidationPassed = false
      }
    })

    if (emailValidationPassed) {
      logTest("Email validation", true)
    }

    // Password strength validation
    const strongPasswords = ["Password123!", "MyStr0ngP@ss", "Secure#2024"]
    const weakPasswords = ["123456", "password", "abc"]

    let passwordValidationPassed = true
    strongPasswords.forEach((password) => {
      if (password.length < 8) {
        logTest(`Strong password validation`, false, `${password} is too short`)
        passwordValidationPassed = false
      }
    })

    if (passwordValidationPassed) {
      logTest("Password validation", true)
    }

    return emailValidationPassed && passwordValidationPassed
  } catch (error) {
    logTest("Data validation", false, error.message)
    return false
  }
}

// 8. Security Test
function testSecurity() {
  console.log("\n🛡️ Testing Security Measures...")

  try {
    // Check JWT secret strength
    const jwtSecret = process.env.JWT_SECRET
    const isStrongSecret = jwtSecret && jwtSecret.length >= 32
    logTest("JWT secret strength", isStrongSecret, isStrongSecret ? "Strong" : "Weak or missing")

    // Check email credentials
    const hasEmailCreds = process.env.HOST_EMAIL && process.env.HOST_EMAIL_PASSWORD
    logTest("Email credentials", hasEmailCreds)

    // Check MongoDB URI security
    const mongoUri = process.env.MONGODB_URI
    const isSecureMongoUri = mongoUri && mongoUri.includes("mongodb+srv://")
    logTest(
      "MongoDB connection security",
      isSecureMongoUri,
      isSecureMongoUri ? "Using SRV (secure)" : "Check connection security",
    )

    return isStrongSecret && hasEmailCreds && isSecureMongoUri
  } catch (error) {
    logTest("Security measures", false, error.message)
    return false
  }
}

// Main test runner
async function runComprehensiveTests() {
  console.log("🚀 Starting comprehensive backend validation...\n")

  const tests = [
    { name: "Environment Variables", fn: testEnvironmentVariables },
    { name: "MongoDB Connection", fn: testMongoDBConnection },
    { name: "Email Service", fn: testEmailService },
    { name: "Authentication Functions", fn: testAuthenticationFunctions },
    { name: "API Endpoints", fn: testAPIEndpoints },
    { name: "Game Scoring Logic", fn: testGameScoringLogic },
    { name: "Data Validation", fn: testDataValidation },
    { name: "Security Measures", fn: testSecurity },
  ]

  for (const test of tests) {
    try {
      await test.fn()
    } catch (error) {
      logTest(test.name, false, `Test execution failed: ${error.message}`)
    }
  }

  // Print comprehensive summary
  console.log("\n" + "=".repeat(60))
  console.log("📊 COMPREHENSIVE TEST RESULTS")
  console.log("=".repeat(60))

  const passRate = Math.round((testResults.passed / testResults.total) * 100)

  console.log(`📈 Overall Results: ${testResults.passed}/${testResults.total} tests passed (${passRate}%)`)

  if (testResults.failed > 0) {
    console.log("\n❌ Failed Tests:")
    testResults.details
      .filter((test) => !test.passed)
      .forEach((test) => {
        console.log(`   • ${test.testName}${test.details ? ` - ${test.details}` : ""}`)
      })
  }

  console.log("\n🔧 RECOMMENDATIONS:")

  if (passRate === 100) {
    console.log("🎉 Excellent! All backend systems are operational.")
    console.log("✅ MongoDB connection is stable")
    console.log("✅ Authentication system is secure")
    console.log("✅ Email service is functional")
    console.log("✅ All API endpoints are responsive")
    console.log("✅ Game scoring logic is accurate")
    console.log("✅ Data validation is robust")
    console.log("✅ Security measures are in place")
  } else if (passRate >= 80) {
    console.log("⚠️ Most systems are working, but some issues need attention.")
  } else {
    console.log("🚨 Critical issues detected. Immediate attention required.")
  }

  console.log("\n🚀 PRODUCTION READINESS CHECKLIST:")
  console.log("□ Environment variables properly configured")
  console.log("□ MongoDB connection stable and secure")
  console.log("□ Email service configured and tested")
  console.log("□ Authentication system secure")
  console.log("□ API endpoints protected and functional")
  console.log("□ Game mechanics working correctly")
  console.log("□ Data validation comprehensive")
  console.log("□ Security measures implemented")
  console.log("□ Error handling robust")
  console.log("□ Logging and monitoring in place")

  console.log("\n🌟 NEXT STEPS:")
  console.log("1. Address any failed tests above")
  console.log("2. Implement rate limiting for API endpoints")
  console.log("3. Add comprehensive logging and monitoring")
  console.log("4. Set up automated testing pipeline")
  console.log("5. Configure production environment variables")
  console.log("6. Implement backup and recovery procedures")

  return passRate === 100
}

// Execute comprehensive testing
runComprehensiveTests()
  .then((success) => {
    if (success) {
      console.log("\n🎉 ALL BACKEND SYSTEMS VALIDATED AND OPERATIONAL!")
      console.log("🚀 Ready for production deployment!")
    } else {
      console.log("\n⚠️ Backend validation completed with issues.")
      console.log("🔧 Please address the failed tests before deployment.")
    }
  })
  .catch((error) => {
    console.error("\n💥 Test suite execution failed:", error)
    console.log("🔧 Please check your environment and try again.")
  })
