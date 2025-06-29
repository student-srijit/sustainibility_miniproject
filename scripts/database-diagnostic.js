// Database Connection Diagnostic Script
console.log("🔍 MONGODB CONNECTION DIAGNOSTIC")
console.log("=".repeat(50))

async function runDatabaseDiagnostic() {
  // 1. Check environment variables
  console.log("📋 Environment Variables Check:")
  console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Present" : "❌ Missing")

  if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI
    console.log("URI Format:", uri.substring(0, 20) + "...")

    // Parse URI components
    try {
      const url = new URL(uri)
      console.log("Protocol:", url.protocol)
      console.log("Host:", url.hostname)
      console.log("Database:", url.pathname.substring(1))
      console.log("Username:", url.username || "Not specified")
      console.log("Password:", url.password ? "✅ Present" : "❌ Missing")
    } catch (error) {
      console.log("❌ URI parsing failed:", error.message)
    }
  }

  // 2. Test MongoDB connection with detailed error reporting
  console.log("\n🔌 MongoDB Connection Test:")

  try {
    const { MongoClient } = require("mongodb")
    const uri = "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB"

    console.log("Attempting connection with URI:", uri.replace(/:[^:@]*@/, ":****@"))

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 5000,
    })

    console.log("Client created, attempting connection...")
    await client.connect()
    console.log("✅ Connection established!")

    // Test ping
    console.log("Testing ping...")
    const pingResult = await client.db("admin").command({ ping: 1 })
    console.log("✅ Ping successful:", pingResult)

    // Test database access
    console.log("Testing database access...")
    const db = client.db("loginDB")
    const collections = await db.listCollections().toArray()
    console.log("✅ Database accessible, collections:", collections.length)

    // Test basic operations
    console.log("Testing basic operations...")
    const testCollection = db.collection("connection_test")

    // Insert test document
    const insertResult = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: "Connection test successful",
    })
    console.log("✅ Insert operation successful:", insertResult.insertedId)

    // Read test document
    const findResult = await testCollection.findOne({ test: true })
    console.log("✅ Read operation successful:", !!findResult)

    // Update test document
    const updateResult = await testCollection.updateOne({ test: true }, { $set: { updated: true } })
    console.log("✅ Update operation successful:", updateResult.modifiedCount)

    // Delete test document
    const deleteResult = await testCollection.deleteOne({ test: true })
    console.log("✅ Delete operation successful:", deleteResult.deletedCount)

    await client.close()
    console.log("✅ Connection closed properly")

    return true
  } catch (error) {
    console.log("❌ MongoDB connection failed!")
    console.log("Error type:", error.constructor.name)
    console.log("Error message:", error.message)
    console.log("Error code:", error.code)

    if (error.cause) {
      console.log("Error cause:", error.cause)
    }

    // Specific error handling
    if (error.message.includes("authentication failed")) {
      console.log("🔑 Authentication issue detected!")
      console.log("   - Check username and password")
      console.log("   - Verify database user permissions")
      console.log("   - Ensure user exists in the correct database")
    }

    if (error.message.includes("network")) {
      console.log("🌐 Network issue detected!")
      console.log("   - Check internet connection")
      console.log("   - Verify MongoDB Atlas cluster is running")
      console.log("   - Check IP whitelist settings")
    }

    if (error.message.includes("timeout")) {
      console.log("⏰ Timeout issue detected!")
      console.log("   - Increase timeout values")
      console.log("   - Check network latency")
      console.log("   - Verify cluster availability")
    }

    return false
  }
}

// 3. Test with alternative connection methods
async function testAlternativeConnections() {
  console.log("\n🔄 Testing Alternative Connection Methods:")

  const connectionStrings = [
    "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB",
    "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB?retryWrites=true&w=majority",
    "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/?retryWrites=true&w=majority",
  ]

  for (let i = 0; i < connectionStrings.length; i++) {
    console.log(`\nTesting connection method ${i + 1}:`)
    try {
      const { MongoClient } = require("mongodb")
      const client = new MongoClient(connectionStrings[i], {
        serverSelectionTimeoutMS: 5000,
      })

      await client.connect()
      await client.db("admin").command({ ping: 1 })
      console.log(`✅ Method ${i + 1} successful`)
      await client.close()
      return connectionStrings[i]
    } catch (error) {
      console.log(`❌ Method ${i + 1} failed:`, error.message)
    }
  }

  return null
}

// Run diagnostic
console.log("Starting comprehensive database diagnostic...\n")

runDatabaseDiagnostic()
  .then(async (success) => {
    if (!success) {
      console.log("\n🔄 Trying alternative connection methods...")
      const workingUri = await testAlternativeConnections()

      if (workingUri) {
        console.log("\n✅ Found working connection string!")
        console.log("Use this URI:", workingUri.replace(/:[^:@]*@/, ":****@"))
      } else {
        console.log("\n❌ All connection methods failed")
        console.log("\n🔧 TROUBLESHOOTING STEPS:")
        console.log("1. Verify MongoDB Atlas cluster is running")
        console.log("2. Check network connectivity")
        console.log("3. Verify credentials (username: Ankushh)")
        console.log("4. Check IP whitelist (add 0.0.0.0/0 for testing)")
        console.log("5. Ensure database user has proper permissions")
        console.log("6. Try connecting from MongoDB Compass")
      }
    } else {
      console.log("\n🎉 Database connection is working perfectly!")
    }
  })
  .catch((error) => {
    console.error("\n💥 Diagnostic script failed:", error)
  })
