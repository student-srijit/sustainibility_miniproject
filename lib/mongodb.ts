import { MongoClient, type MongoClientOptions, type Db } from "mongodb"

// Use the exact URI from your .env.local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Ankushh:ankush66@cluster0.wvivwbg.mongodb.net/loginDB"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 3000, // Reduced timeout for faster failure
  socketTimeoutMS: 45000,
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

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options)
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("✅ MongoDB connected successfully in development mode")
        return client
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed in development:", error.message)
        throw error
      })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options)
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ MongoDB connected successfully in production mode")
      return client
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed in production:", error.message)
      throw error
    })
}

// Test connection function with detailed error reporting
export async function testConnection(): Promise<boolean> {
  try {
    console.log("🔌 Testing MongoDB connection...")
    const client = await clientPromise
    const result = await client.db("admin").command({ ping: 1 })
    console.log("✅ MongoDB ping successful:", result)

    // Test database access
    const db = client.db("loginDB")
    const collections = await db.listCollections().toArray()
    console.log(`✅ Database 'loginDB' accessible with ${collections.length} collections`)

    return true
  } catch (error: any) {
    console.error("❌ MongoDB connection test failed:")
    console.error("Error:", error.message)
    console.error("Code:", error.code)

    // Provide specific troubleshooting advice
    if (error.message.includes("authentication failed")) {
      console.error("🔑 Authentication failed - check username/password")
    } else if (error.message.includes("network")) {
      console.error("🌐 Network error - check internet connection and cluster status")
    } else if (error.message.includes("timeout")) {
      console.error("⏰ Connection timeout - check network latency")
    }

    return false
  }
}

// Get database instance with error handling
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
export async function healthCheck(): Promise<{ status: string; message: string }> {
  try {
    const isConnected = await testConnection()
    return {
      status: isConnected ? "healthy" : "unhealthy",
      message: isConnected ? "Database connection is working" : "Database connection failed",
    }
  } catch (error: any) {
    return {
      status: "error",
      message: `Health check failed: ${error.message}`,
    }
  }
}

export default clientPromise
