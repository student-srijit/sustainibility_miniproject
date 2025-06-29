// Database Initialization and Setup Script
console.log("🗄️ INITIALIZING DATABASE...")

async function initializeDatabase() {
  try {
    const { MongoClient } = require("mongodb")
    const uri = process.env.MONGODB_URI

    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not set")
    }

    const client = new MongoClient(uri)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db("loginDB")

    // Create indexes for better performance
    console.log("📊 Creating database indexes...")

    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ points: -1 })
    await db.collection("users").createIndex({ createdAt: 1 })
    console.log("✅ Users collection indexes created")

    // Game scores collection indexes
    await db.collection("game_scores").createIndex({ userId: 1 })
    await db.collection("game_scores").createIndex({ gameId: 1 })
    await db.collection("game_scores").createIndex({ playedAt: -1 })
    await db.collection("game_scores").createIndex({ userId: 1, gameId: 1 })
    console.log("✅ Game scores collection indexes created")

    // Create sample data if collections are empty
    const userCount = await db.collection("users").countDocuments()
    if (userCount === 0) {
      console.log("📝 Creating sample data...")

      const bcrypt = require("bcryptjs")
      const sampleUsers = [
        {
          name: "Eco Warrior",
          email: "eco@thinkgreen.com",
          password: await bcrypt.hash("password123", 12),
          points: 1500,
          createdAt: new Date(),
          gamesPlayed: 25,
          emailVerified: true,
        },
        {
          name: "Green Guardian",
          email: "green@thinkgreen.com",
          password: await bcrypt.hash("password123", 12),
          points: 1200,
          createdAt: new Date(),
          gamesPlayed: 18,
          emailVerified: true,
        },
        {
          name: "Planet Protector",
          email: "planet@thinkgreen.com",
          password: await bcrypt.hash("password123", 12),
          points: 900,
          createdAt: new Date(),
          gamesPlayed: 12,
          emailVerified: true,
        },
      ]

      await db.collection("users").insertMany(sampleUsers)
      console.log("✅ Sample users created")

      // Create sample game scores
      const users = await db.collection("users").find().toArray()
      const gameScores = []

      users.forEach((user) => {
        // Add some random game scores
        for (let i = 0; i < 5; i++) {
          gameScores.push({
            userId: user._id,
            gameId: "recycling-rush",
            score: Math.floor(Math.random() * 200) + 50,
            points: Math.floor(Math.random() * 20) + 5,
            playedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          })

          gameScores.push({
            userId: user._id,
            gameId: "energy-puzzle",
            score: Math.floor(Math.random() * 10) + 3,
            points: Math.floor(Math.random() * 50) + 15,
            playedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          })

          gameScores.push({
            userId: user._id,
            gameId: "eco-quiz",
            score: Math.floor(Math.random() * 10) + 5,
            points: Math.floor(Math.random() * 100) + 50,
            playedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          })
        }
      })

      await db.collection("game_scores").insertMany(gameScores)
      console.log("✅ Sample game scores created")
    }

    // Verify collections
    const collections = await db.listCollections().toArray()
    console.log(`✅ Database initialized with ${collections.length} collections:`)
    collections.forEach((col) => console.log(`   • ${col.name}`))

    await client.close()
    console.log("✅ Database initialization completed successfully!")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    throw error
  }
}

// Run initialization
initializeDatabase()
  .then(() => {
    console.log("🎉 Database is ready for use!")
  })
  .catch((error) => {
    console.error("💥 Initialization failed:", error)
    process.exit(1)
  })
