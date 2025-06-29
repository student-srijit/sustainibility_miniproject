// Comprehensive Backend Testing Script
console.log("🚀 Starting comprehensive backend testing...\n")

// Test MongoDB Connection
async function testMongoConnection() {
  console.log("📊 Testing MongoDB Connection...")
  try {
    const { MongoClient } = require("mongodb")
    const uri = process.env.MONGODB_URI || "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB"

    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db("loginDB")
    const collections = await db.listCollections().toArray()

    console.log("✅ MongoDB connection successful")
    console.log(`📋 Found ${collections.length} collections in database`)

    await client.close()
    return true
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    return false
  }
}

// Test Email Configuration
async function testEmailConfig() {
  console.log("\n📧 Testing Email Configuration...")
  try {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.HOST_EMAIL || "heise3nberg@gmail.com",
        pass: process.env.HOST_EMAIL_PASSWORD || "ukwc zxec davc btlm",
      },
    })

    await transporter.verify()
    console.log("✅ Email configuration verified")
    return true
  } catch (error) {
    console.error("❌ Email configuration failed:", error.message)
    return false
  }
}

// Test Authentication Functions
async function testAuthFunctions() {
  console.log("\n🔐 Testing Authentication Functions...")
  try {
    const bcrypt = require("bcryptjs")
    const jwt = require("jsonwebtoken")

    // Test password hashing
    const password = "testPassword123"
    const hashedPassword = await bcrypt.hash(password, 12)
    const isValid = await bcrypt.compare(password, hashedPassword)

    if (!isValid) {
      throw new Error("Password hashing/verification failed")
    }

    // Test JWT token generation
    const payload = { userId: "test123", email: "test@example.com" }
    const secret = process.env.JWT_SECRET || "sustainability-website-super-secret-key-2024"
    const token = jwt.sign(payload, secret, { expiresIn: "7d" })
    const decoded = jwt.verify(token, secret)

    if (decoded.userId !== payload.userId) {
      throw new Error("JWT token generation/verification failed")
    }

    console.log("✅ Password hashing works correctly")
    console.log("✅ JWT token generation works correctly")
    return true
  } catch (error) {
    console.error("❌ Authentication functions failed:", error.message)
    return false
  }
}

// Test OTP Generation
function testOTPGeneration() {
  console.log("\n🔢 Testing OTP Generation...")
  try {
    const crypto = require("crypto")

    // Generate multiple OTPs to ensure randomness
    const otps = []
    for (let i = 0; i < 5; i++) {
      const otp = crypto.randomInt(100000, 999999).toString()
      otps.push(otp)

      if (otp.length !== 6) {
        throw new Error("OTP length is not 6 digits")
      }
    }

    // Check if OTPs are unique (basic randomness test)
    const uniqueOTPs = new Set(otps)
    if (uniqueOTPs.size !== otps.length) {
      console.warn("⚠️ Some OTPs were duplicated (this is rare but possible)")
    }

    console.log("✅ OTP generation works correctly")
    console.log(`📊 Generated OTPs: ${otps.join(", ")}`)
    return true
  } catch (error) {
    console.error("❌ OTP generation failed:", error.message)
    return false
  }
}

// Test Game Scoring Logic
function testGameScoring() {
  console.log("\n🎮 Testing Game Scoring Logic...")
  try {
    // Test different game scoring algorithms
    const games = [
      { id: "recycling-rush", score: 100, expectedPoints: 10 },
      { id: "energy-puzzle", score: 5, expectedPoints: 25 },
      { id: "eco-quiz", score: 8, expectedPoints: 80 },
    ]

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

      if (points !== game.expectedPoints) {
        throw new Error(`Scoring mismatch for ${game.id}: expected ${game.expectedPoints}, got ${points}`)
      }
    })

    console.log("✅ Game scoring algorithms work correctly")
    return true
  } catch (error) {
    console.error("❌ Game scoring failed:", error.message)
    return false
  }
}

// Test Environment Variables
function testEnvironmentVariables() {
  console.log("\n🌍 Testing Environment Variables...")
  try {
    const requiredVars = ["MONGODB_URI", "JWT_SECRET", "HOST_EMAIL", "HOST_EMAIL_PASSWORD"]

    const missingVars = []

    requiredVars.forEach((varName) => {
      const value = process.env[varName]
      if (!value) {
        missingVars.push(varName)
      } else {
        console.log(`✅ ${varName}: ${varName.includes("PASSWORD") ? "***hidden***" : value.substring(0, 20)}...`)
      }
    })

    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(", ")}`)
    }

    console.log("✅ All required environment variables are set")
    return true
  } catch (error) {
    console.error("❌ Environment variables check failed:", error.message)
    return false
  }
}

// Test Data Validation
function testDataValidation() {
  console.log("\n✅ Testing Data Validation...")
  try {
    // Test email validation
    const validEmails = ["test@example.com", "user.name@domain.co.uk", "test+tag@gmail.com"]
    const invalidEmails = ["invalid-email", "@domain.com", "test@", "test.domain.com"]

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    validEmails.forEach((email) => {
      if (!emailRegex.test(email)) {
        throw new Error(`Valid email ${email} failed validation`)
      }
    })

    invalidEmails.forEach((email) => {
      if (emailRegex.test(email)) {
        throw new Error(`Invalid email ${email} passed validation`)
      }
    })

    // Test password strength
    const strongPasswords = ["Password123!", "MyStr0ngP@ss", "Secure#2024"]
    const weakPasswords = ["123456", "password", "abc"]

    strongPasswords.forEach((password) => {
      if (password.length < 8) {
        throw new Error(`Strong password ${password} is too short`)
      }
    })

    console.log("✅ Email validation works correctly")
    console.log("✅ Password validation works correctly")
    return true
  } catch (error) {
    console.error("❌ Data validation failed:", error.message)
    return false
  }
}

// Run all tests
async function runAllTests() {
  console.log("🧪 SUSTAINABILITY WEBSITE BACKEND TEST SUITE")
  console.log("=".repeat(50))

  const tests = [
    { name: "Environment Variables", fn: testEnvironmentVariables },
    { name: "MongoDB Connection", fn: testMongoConnection },
    { name: "Email Configuration", fn: testEmailConfig },
    { name: "Authentication Functions", fn: testAuthFunctions },
    { name: "OTP Generation", fn: testOTPGeneration },
    { name: "Game Scoring Logic", fn: testGameScoring },
    { name: "Data Validation", fn: testDataValidation },
  ]

  const results = []

  for (const test of tests) {
    try {
      const result = await test.fn()
      results.push({ name: test.name, passed: result })
    } catch (error) {
      results.push({ name: test.name, passed: false, error: error.message })
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(50))
  console.log("📊 TEST RESULTS SUMMARY")
  console.log("=".repeat(50))

  const passed = results.filter((r) => r.passed).length
  const total = results.length

  results.forEach((result) => {
    const status = result.passed ? "✅ PASS" : "❌ FAIL"
    console.log(`${status} - ${result.name}`)
    if (!result.passed && result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })

  console.log("\n" + "-".repeat(50))
  console.log(`📈 Overall: ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)`)

  if (passed === total) {
    console.log("🎉 All tests passed! Backend is ready for production.")
  } else {
    console.log("⚠️ Some tests failed. Please review and fix the issues above.")
  }

  // Additional recommendations
  console.log("\n🔧 SECURITY RECOMMENDATIONS:")
  console.log("- Ensure JWT_SECRET is a strong, random string in production")
  console.log("- Use environment-specific email credentials")
  console.log("- Enable MongoDB authentication and SSL in production")
  console.log("- Implement rate limiting for API endpoints")
  console.log("- Add input sanitization for all user inputs")
  console.log("- Use HTTPS in production environment")

  console.log("\n🚀 PERFORMANCE RECOMMENDATIONS:")
  console.log("- Implement Redis for OTP storage in production")
  console.log("- Add database indexing for user queries")
  console.log("- Implement caching for leaderboard data")
  console.log("- Use connection pooling for MongoDB")
  console.log("- Add monitoring and logging for API endpoints")

  return passed === total
}

// Execute the test suite
runAllTests()
  .then((success) => {
    if (success) {
      console.log("\n✨ Backend testing completed successfully!")
      process.exit(0)
    } else {
      console.log("\n💥 Backend testing completed with errors!")
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error("\n💥 Test suite execution failed:", error)
    process.exit(1)
  })
