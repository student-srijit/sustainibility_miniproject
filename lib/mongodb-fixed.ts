import { MongoClient, type MongoClientOptions, type Db } from "mongodb"

// Validate environment variables at module load
if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI environment variable is not defined")
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 15000, // 15 seconds
  socketTimeoutMS: 45000, // 45 seconds
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: "majority",
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 5000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Connection management
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("✅ MongoDB connected successfully (development)")
        return client
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed (development):", error.message)

        // Provide specific error guidance
        if (error.message.includes("authentication failed")) {
          console.error("🔑 Authentication issue - check username/password in MongoDB Atlas")
        } else if (error.message.includes("network")) {
          console.error("🌐 Network issue - check IP whitelist in MongoDB Atlas")
        }

        throw error
      })
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ MongoDB connected successfully (production)")
      return client
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed (production):", error.message)
      throw error
    })
}

// Enhanced connection test
export async function testConnection(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    console.log("🔌 Testing MongoDB connection...")

    const client = await clientPromise
    const result = await client.db("admin").command({ ping: 1 })

    if (result.ok === 1) {
      console.log("✅ MongoDB ping successful")

      // Test database access
      const db = client.db("loginDB")
      const collections = await db.listCollections().toArray()

      console.log(`✅ Database 'loginDB' accessible with ${collections.length} collections`)

      return {
        success: true,
        message: "MongoDB connection is healthy",
        details: {
          ping: "OK",
          database: "loginDB",
          collections: collections.length,
          collectionNames: collections.map((c) => c.name),
        },
      }
    } else {
      throw new Error("Ping command failed")
    }
  } catch (error: any) {
    console.error("❌ MongoDB connection test failed:", error.message)

    let troubleshooting: string[] = []

    if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
      troubleshooting = [
        "Go to MongoDB Atlas → Database Access",
        "Verify user 'Ankushh' exists and has correct password",
        "Ensure user has 'readWrite' permissions on 'loginDB' database",
        "Check if user is enabled (not disabled)",
      ]
    } else if (error.message.includes("network") || error.message.includes("ENOTFOUND")) {
      troubleshooting = [
        "Go to MongoDB Atlas → Network Access",
        "Add your IP address or 0.0.0.0/0 for testing",
        "Check if cluster is running (not paused)",
        "Verify internet connection",
      ]
    } else if (error.message.includes("timeout")) {
      troubleshooting = [
        "Check network latency and stability",
        "Verify MongoDB Atlas cluster performance",
        "Try connecting from a different network",
        "Increase timeout values if needed",
      ]
    }

    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      details: {
        error: error.message,
        code: error.code,
        troubleshooting,
      },
    }
  }
}

// Get database with error handling
export async function getDatabase(): Promise<Db> {
  try {
    const client = await clientPromise
    return client.db("loginDB")
  } catch (error: any) {
    console.error("❌ Failed to get database instance:", error.message)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

// Health check function
export async function healthCheck() {
  const connectionTest = await testConnection()

  return {
    status: connectionTest.success ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    database: connectionTest.success ? "connected" : "disconnected",
    message: connectionTest.message,
    details: connectionTest.details,
  }
}

export default clientPromise
