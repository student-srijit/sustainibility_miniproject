// Deployment Readiness Check
console.log("🚀 Checking deployment readiness...\n")

function checkEnvironmentVariables() {
  console.log("🌍 Checking Environment Variables...")

  const requiredVars = ["MONGODB_URI", "JWT_SECRET", "HOST_EMAIL", "HOST_EMAIL_PASSWORD"]

  const missingVars = []

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName)
    } else {
      console.log(`✅ ${varName} is set`)
    }
  })

  if (missingVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingVars.join(", ")}`)
    return false
  }

  console.log("✅ All environment variables are configured")
  return true
}

function checkNextJSConfig() {
  console.log("\n⚙️ Checking Next.js Configuration...")

  try {
    // Check if next.config.mjs exists and has proper webpack config
    const fs = require("fs")
    const path = require("path")

    const configPath = path.join(process.cwd(), "next.config.mjs")

    if (!fs.existsSync(configPath)) {
      console.error("❌ next.config.mjs not found")
      return false
    }

    const configContent = fs.readFileSync(configPath, "utf8")

    if (!configContent.includes("serverComponentsExternalPackages")) {
      console.error("❌ Missing serverComponentsExternalPackages configuration")
      return false
    }

    if (!configContent.includes("webpack")) {
      console.error("❌ Missing webpack configuration")
      return false
    }

    console.log("✅ Next.js configuration is properly set up")
    return true
  } catch (error) {
    console.error("❌ Error checking Next.js config:", error.message)
    return false
  }
}

function checkPackageJson() {
  console.log("\n📦 Checking package.json...")

  try {
    const fs = require("fs")
    const path = require("path")

    const packagePath = path.join(process.cwd(), "package.json")
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"))

    const requiredDeps = ["next", "react", "react-dom", "mongodb", "bcryptjs", "jsonwebtoken", "nodemailer"]

    const missingDeps = []

    requiredDeps.forEach((dep) => {
      if (!packageJson.dependencies[dep]) {
        missingDeps.push(dep)
      }
    })

    if (missingDeps.length > 0) {
      console.error(`❌ Missing dependencies: ${missingDeps.join(", ")}`)
      return false
    }

    console.log("✅ All required dependencies are present")
    return true
  } catch (error) {
    console.error("❌ Error checking package.json:", error.message)
    return false
  }
}

function checkServerSideOnlyCode() {
  console.log("\n🖥️ Checking server-side only code...")

  try {
    // Simulate server-side environment check
    if (typeof window !== "undefined") {
      console.error("❌ This check should run in Node.js environment")
      return false
    }

    console.log("✅ Running in proper server environment")

    // Check if MongoDB connection can be imported
    try {
      require("../lib/mongodb")
      console.log("✅ MongoDB connection module can be imported")
    } catch (error) {
      console.error("❌ MongoDB connection import failed:", error.message)
      return false
    }

    return true
  } catch (error) {
    console.error("❌ Server-side check failed:", error.message)
    return false
  }
}

async function runDeploymentCheck() {
  console.log("🔍 DEPLOYMENT READINESS CHECK")
  console.log("=".repeat(40))

  const checks = [
    { name: "Environment Variables", fn: checkEnvironmentVariables },
    { name: "Next.js Configuration", fn: checkNextJSConfig },
    { name: "Package Dependencies", fn: checkPackageJson },
    { name: "Server-side Code", fn: checkServerSideOnlyCode },
  ]

  const results = []

  for (const check of checks) {
    try {
      const result = await check.fn()
      results.push({ name: check.name, passed: result })
    } catch (error) {
      results.push({ name: check.name, passed: false, error: error.message })
    }
  }

  console.log("\n" + "=".repeat(40))
  console.log("📊 DEPLOYMENT CHECK RESULTS")
  console.log("=".repeat(40))

  const passed = results.filter((r) => r.passed).length
  const total = results.length

  results.forEach((result) => {
    const status = result.passed ? "✅ PASS" : "❌ FAIL"
    console.log(`${status} - ${result.name}`)
    if (!result.passed && result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })

  console.log(`\n📈 Overall: ${passed}/${total} checks passed`)

  if (passed === total) {
    console.log("🎉 Ready for deployment!")
    console.log("\n🚀 Deployment Commands:")
    console.log("- Vercel: vercel --prod")
    console.log("- Netlify: npm run build && netlify deploy --prod")
    console.log("- Railway: railway up")
  } else {
    console.log("⚠️ Fix the issues above before deploying")
  }

  return passed === total
}

runDeploymentCheck()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("💥 Deployment check failed:", error)
    process.exit(1)
  })
