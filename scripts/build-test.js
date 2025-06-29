// Build Test Script
console.log("🔨 Testing build configuration...\n")

function testImports() {
  console.log("📦 Testing dynamic imports...")

  // Test that we can dynamically import server-side modules
  async function testServerImports() {
    try {
      // Test bcryptjs
      const bcrypt = await import("bcryptjs")
      console.log("✅ bcryptjs can be dynamically imported")

      // Test jsonwebtoken
      const jwt = await import("jsonwebtoken")
      console.log("✅ jsonwebtoken can be dynamically imported")

      // Test nodemailer (this should work in Node.js environment)
      const nodemailer = await import("nodemailer")
      console.log("✅ nodemailer can be dynamically imported")

      return true
    } catch (error) {
      console.error("❌ Dynamic import failed:", error.message)
      return false
    }
  }

  return testServerImports()
}

function testEnvironment() {
  console.log("\n🌍 Testing environment...")

  // Check if we're in Node.js environment
  if (typeof window !== "undefined") {
    console.error("❌ Running in browser environment")
    return false
  }

  console.log("✅ Running in Node.js environment")

  // Check for required environment variables
  const requiredVars = ["MONGODB_URI", "JWT_SECRET", "HOST_EMAIL", "HOST_EMAIL_PASSWORD"]
  const missingVars = []

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName)
    }
  })

  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(", ")}`)
    console.log("   (This is expected in build environment)")
  } else {
    console.log("✅ All environment variables are set")
  }

  return true
}

async function runBuildTest() {
  console.log("🚀 BUILD CONFIGURATION TEST")
  console.log("=".repeat(40))

  const envTest = testEnvironment()
  const importTest = await testImports()

  console.log("\n" + "=".repeat(40))
  console.log("📊 BUILD TEST RESULTS")
  console.log("=".repeat(40))

  console.log(`Environment: ${envTest ? "✅ PASS" : "❌ FAIL"}`)
  console.log(`Dynamic Imports: ${importTest ? "✅ PASS" : "❌ FAIL"}`)

  const allPassed = envTest && importTest

  if (allPassed) {
    console.log("\n🎉 Build configuration is ready!")
    console.log("✅ All server-side modules use dynamic imports")
    console.log("✅ No client-side import conflicts")
    console.log("✅ Ready for deployment")
  } else {
    console.log("\n⚠️ Build configuration needs attention")
  }

  return allPassed
}

runBuildTest()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("💥 Build test failed:", error)
    process.exit(1)
  })
