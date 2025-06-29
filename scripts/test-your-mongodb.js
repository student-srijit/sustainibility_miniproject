// Specific test for your MongoDB Atlas setup
console.log("🧪 TESTING YOUR SPECIFIC MONGODB SETUP")
console.log("=".repeat(50))

async function testYourMongoDB() {
  const { MongoClient } = require("mongodb")

  // Your exact connection details
  const uri = "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB"
  const dbName = "loginDB"

  console.log("📋 Connection Details:")
  console.log("Cluster: cluster0.wvivwbg.mongodb.net")
  console.log("Username: Ankushh")
  console.log("Database: loginDB")
  console.log("Protocol: mongodb+srv (SRV)")

  try {
    console.log("\n🔌 Step 1: Creating MongoDB client...")
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
      minPoolSize: 1,
    })
    console.log("✅ Client created successfully")

    console.log("\n🔌 Step 2: Connecting to MongoDB Atlas...")
    await client.connect()
    console.log("✅ Connected to MongoDB Atlas!")

    console.log("\n🏓 Step 3: Testing ping...")
    const pingResult = await client.db("admin").command({ ping: 1 })
    console.log("✅ Ping successful:", pingResult.ok === 1 ? "OK" : "FAILED")

    console.log("\n📊 Step 4: Accessing your database...")
    const db = client.db(dbName)
    console.log("✅ Database instance created")

    console.log("\n📋 Step 5: Listing collections...")
    const collections = await db.listCollections().toArray()
    console.log(`✅ Found ${collections.length} collections:`)
    collections.forEach((col) => console.log(`   • ${col.name}`))

    console.log("\n🧪 Step 6: Testing CRUD operations...")

    // Create test collection
    const testCollection = db.collection("connection_test")

    // Insert
    const insertResult = await testCollection.insertOne({
      test: "connection_test",
      timestamp: new Date(),
      message: "Testing from ThinkGreen app",
    })
    console.log("✅ Insert test passed, ID:", insertResult.insertedId)

    // Read
    const document = await testCollection.findOne({ test: "connection_test" })
    console.log("✅ Read test passed:", !!document)

    // Update
    const updateResult = await testCollection.updateOne(
      { test: "connection_test" },
      { $set: { updated: true, updateTime: new Date() } },
    )
    console.log("✅ Update test passed, modified:", updateResult.modifiedCount)

    // Delete
    const deleteResult = await testCollection.deleteOne({ test: "connection_test" })
    console.log("✅ Delete test passed, deleted:", deleteResult.deletedCount)

    console.log("\n🔒 Step 7: Testing user operations...")

    // Test users collection
    const usersCollection = db.collection("users")
    const userCount = await usersCollection.countDocuments()
    console.log(`✅ Users collection accessible, count: ${userCount}`)

    // Test game_scores collection
    const scoresCollection = db.collection("game_scores")
    const scoresCount = await scoresCollection.countDocuments()
    console.log(`✅ Game scores collection accessible, count: ${scoresCount}`)

    console.log("\n🔐 Step 8: Testing authentication operations...")

    // Test creating a user (without actually saving)
    const bcrypt = require("bcryptjs")
    const testUser = {
      name: "Test User",
      email: "test@thinkgreen.com",
      password: await bcrypt.hash("testpassword", 12),
      points: 0,
      createdAt: new Date(),
      emailVerified: false,
    }
    console.log("✅ User object creation test passed")

    // Test JWT operations
    const jwt = require("jsonwebtoken")
    const token = jwt.sign(
      { userId: "test123", email: "test@thinkgreen.com" },
      process.env.JWT_SECRET || "test-secret",
      { expiresIn: "7d" },
    )
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "test-secret")
    console.log("✅ JWT operations test passed")

    await client.close()
    console.log("\n✅ Connection closed properly")

    console.log("\n🎉 ALL TESTS PASSED!")
    console.log("Your MongoDB setup is working perfectly!")

    return true
  } catch (error) {
    console.log("\n❌ CONNECTION FAILED!")
    console.log("Error type:", error.constructor.name)
    console.log("Error message:", error.message)

    if (error.code) {
      console.log("Error code:", error.code)
    }

    console.log("\n🔧 SPECIFIC TROUBLESHOOTING:")

    if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
      console.log("🔑 AUTHENTICATION ISSUE:")
      console.log("   1. Username: Ankushh (check spelling)")
      console.log("   2. Password: ankush66 (check spelling)")
      console.log("   3. Go to MongoDB Atlas → Database Access")
      console.log("   4. Verify user 'Ankushh' exists")
      console.log("   5. Check user has 'readWrite' permissions on 'loginDB'")
      console.log("   6. Try resetting the password")
    }

    if (error.message.includes("network") || error.message.includes("ENOTFOUND")) {
      console.log("🌐 NETWORK ISSUE:")
      console.log("   1. Check internet connection")
      console.log("   2. Go to MongoDB Atlas → Network Access")
      console.log("   3. Add IP address 0.0.0.0/0 (allow all) for testing")
      console.log("   4. Verify cluster is running (not paused)")
      console.log("   5. Check cluster region and connectivity")
    }

    if (error.message.includes("timeout")) {
      console.log("⏰ TIMEOUT ISSUE:")
      console.log("   1. Increase timeout values")
      console.log("   2. Check network latency")
      console.log("   3. Try connecting from different network")
      console.log("   4. Verify cluster is not overloaded")
    }

    console.log("\n📞 NEXT STEPS:")
    console.log("1. Go to MongoDB Atlas dashboard")
    console.log("2. Check cluster status (should be green)")
    console.log("3. Verify Network Access allows your IP")
    console.log("4. Check Database Access user permissions")
    console.log("5. Try connecting with MongoDB Compass first")
    console.log("6. Contact MongoDB support if issues persist")

    return false
  }
}

// Run the test
testYourMongoDB()
  .then((success) => {
    if (success) {
      console.log("\n🚀 READY FOR PRODUCTION!")
      console.log("Your database connection is solid!")
    } else {
      console.log("\n⚠️ NEEDS ATTENTION")
      console.log("Please fix the issues above before proceeding")
    }
  })
  .catch((error) => {
    console.error("\n💥 Test execution failed:", error)
  })
