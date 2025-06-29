import { getDatabase } from "./mongodb-fixed"
import type { Collection } from "mongodb"

export interface User {
  _id?: string
  name: string
  email: string
  password: string
  points: number
  createdAt: Date
  emailVerified: boolean
  lastLogin?: Date
  gameStats?: {
    recyclingRush: { highScore: number; gamesPlayed: number }
    energyPuzzle: { highScore: number; gamesPlayed: number }
    ecoQuiz: { highScore: number; gamesPlayed: number }
  }
}

export interface OTPRecord {
  email: string
  otp: string
  expiresAt: Date
  attempts: number
  createdAt: Date
}

export interface GameScore {
  userId: string
  gameType: string
  score: number
  timestamp: Date
  details?: any
}

// User management functions
export async function createUser(userData: Omit<User, "_id" | "createdAt">): Promise<string> {
  try {
    const db = await getDatabase()
    const users: Collection<User> = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error("User already exists with this email")
    }

    const user: User = {
      ...userData,
      createdAt: new Date(),
      gameStats: {
        recyclingRush: { highScore: 0, gamesPlayed: 0 },
        energyPuzzle: { highScore: 0, gamesPlayed: 0 },
        ecoQuiz: { highScore: 0, gamesPlayed: 0 },
      },
    }

    const result = await users.insertOne(user)
    console.log("✅ User created successfully:", result.insertedId)
    return result.insertedId.toString()
  } catch (error: any) {
    console.error("❌ Failed to create user:", error.message)
    throw error
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await getDatabase()
    const users: Collection<User> = db.collection("users")
    const user = await users.findOne({ email })
    return user
  } catch (error: any) {
    console.error("❌ Failed to find user by email:", error.message)
    throw error
  }
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  try {
    const db = await getDatabase()
    const users: Collection<User> = db.collection("users")
    const { ObjectId } = await import("mongodb")

    await users.updateOne({ _id: new ObjectId(userId) }, { $set: { lastLogin: new Date() } })
    console.log("✅ User last login updated")
  } catch (error: any) {
    console.error("❌ Failed to update user last login:", error.message)
    throw error
  }
}

export async function verifyUserEmail(email: string): Promise<void> {
  try {
    const db = await getDatabase()
    const users: Collection<User> = db.collection("users")

    await users.updateOne({ email }, { $set: { emailVerified: true } })
    console.log("✅ User email verified")
  } catch (error: any) {
    console.error("❌ Failed to verify user email:", error.message)
    throw error
  }
}

// OTP management functions
export async function saveOTP(email: string, otp: string): Promise<void> {
  try {
    const db = await getDatabase()
    const otps: Collection<OTPRecord> = db.collection("otps")

    // Remove any existing OTPs for this email
    await otps.deleteMany({ email })

    const otpRecord: OTPRecord = {
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0,
      createdAt: new Date(),
    }

    await otps.insertOne(otpRecord)
    console.log("✅ OTP saved successfully")
  } catch (error: any) {
    console.error("❌ Failed to save OTP:", error.message)
    throw error
  }
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  try {
    const db = await getDatabase()
    const otps: Collection<OTPRecord> = db.collection("otps")

    const otpRecord = await otps.findOne({ email })

    if (!otpRecord) {
      console.log("❌ No OTP found for email:", email)
      return false
    }

    if (otpRecord.expiresAt < new Date()) {
      console.log("❌ OTP expired for email:", email)
      await otps.deleteOne({ email })
      return false
    }

    if (otpRecord.attempts >= 3) {
      console.log("❌ Too many OTP attempts for email:", email)
      await otps.deleteOne({ email })
      return false
    }

    if (otpRecord.otp !== otp) {
      console.log("❌ Invalid OTP for email:", email)
      await otps.updateOne({ email }, { $inc: { attempts: 1 } })
      return false
    }

    // OTP is valid, remove it
    await otps.deleteOne({ email })
    console.log("✅ OTP verified successfully for:", email)
    return true
  } catch (error: any) {
    console.error("❌ Failed to verify OTP:", error.message)
    throw error
  }
}

// Game score functions
export async function saveGameScore(userId: string, gameType: string, score: number, details?: any): Promise<void> {
  try {
    const db = await getDatabase()
    const scores: Collection<GameScore> = db.collection("game_scores")
    const users: Collection<User> = db.collection("users")
    const { ObjectId } = await import("mongodb")

    // Save the score
    const gameScore: GameScore = {
      userId,
      gameType,
      score,
      timestamp: new Date(),
      details,
    }

    await scores.insertOne(gameScore)

    // Update user's game stats and points
    const user = await users.findOne({ _id: new ObjectId(userId) })
    if (user) {
      const gameStatKey = `gameStats.${gameType}`
      const currentHighScore = user.gameStats?.[gameType as keyof typeof user.gameStats]?.highScore || 0
      const currentGamesPlayed = user.gameStats?.[gameType as keyof typeof user.gameStats]?.gamesPlayed || 0

      const updates: any = {
        $inc: { points: score },
        $set: {
          [`${gameStatKey}.gamesPlayed`]: currentGamesPlayed + 1,
        },
      }

      if (score > currentHighScore) {
        updates.$set[`${gameStatKey}.highScore`] = score
      }

      await users.updateOne({ _id: new ObjectId(userId) }, updates)
    }

    console.log("✅ Game score saved successfully")
  } catch (error: any) {
    console.error("❌ Failed to save game score:", error.message)
    throw error
  }
}

export async function getLeaderboard(gameType?: string, limit = 10) {
  try {
    const db = await getDatabase()
    const users: Collection<User> = db.collection("users")

    const pipeline: any[] = [
      {
        $project: {
          name: 1,
          email: 1,
          points: 1,
          gameStats: 1,
          totalScore: gameType ? `$gameStats.${gameType}.highScore` : "$points",
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: limit },
    ]

    const leaderboard = await users.aggregate(pipeline).toArray()
    console.log("✅ Leaderboard retrieved successfully")
    return leaderboard
  } catch (error: any) {
    console.error("❌ Failed to get leaderboard:", error.message)
    throw error
  }
}

// Cleanup functions
export async function cleanupExpiredOTPs(): Promise<void> {
  try {
    const db = await getDatabase()
    const otps: Collection<OTPRecord> = db.collection("otps")

    const result = await otps.deleteMany({
      expiresAt: { $lt: new Date() },
    })

    console.log(`✅ Cleaned up ${result.deletedCount} expired OTPs`)
  } catch (error: any) {
    console.error("❌ Failed to cleanup expired OTPs:", error.message)
  }
}
