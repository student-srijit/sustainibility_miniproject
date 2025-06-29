import crypto from "crypto"
import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "sustainability-website-super-secret-key-2024"

// Enhanced OTP storage with database persistence
class OTPManager {
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired OTPs every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  private async cleanup() {
    try {
      const db = await getDatabase()
      const result = await db.collection("otps").deleteMany({
        expires: { $lt: Date.now() }
      })
      if (result.deletedCount > 0) {
        console.log(`🧹 Cleaned up ${result.deletedCount} expired OTPs`)
      }
    } catch (error) {
      console.error("❌ Failed to cleanup OTPs:", error)
    }
  }

  async generateOTP(email: string): Promise<string> {
    try {
      const db = await getDatabase()
      
      // Check if there's an existing OTP
      const existingOTP = await db.collection("otps").findOne({ email })
      if (existingOTP) {
        // If the existing OTP is not expired, return it
        if (existingOTP.expires > Date.now()) {
          console.log(`🔢 Reusing existing OTP for ${email}`)
          return existingOTP.otp
        }
        // If expired, remove it
        await db.collection("otps").deleteOne({ email })
      }

      // Generate new OTP
      const otp = crypto.randomInt(100000, 999999).toString()
      const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

      // Store in database
      await db.collection("otps").insertOne({
        email,
        otp,
        expires,
        attempts: 0,
        createdAt: new Date()
      })

      console.log(`🔢 Generated new OTP for ${email}: ${otp}`)
      return otp
    } catch (error) {
      console.error(`❌ Failed to generate OTP for ${email}:`, error)
      throw new Error("Failed to generate OTP")
    }
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const db = await getDatabase()
      const storedOTP = await db.collection("otps").findOne({ email })

      if (!storedOTP) {
        console.log(`❌ No OTP found for ${email}`)
        return false
      }

      if (storedOTP.expires < Date.now()) {
        await db.collection("otps").deleteOne({ email })
        console.log(`❌ OTP expired for ${email}`)
        return false
      }

      // Update attempts
      await db.collection("otps").updateOne(
        { email },
        { $inc: { attempts: 1 } }
      )

      if (storedOTP.attempts >= 3) {
        await db.collection("otps").deleteOne({ email })
        console.log(`❌ Too many attempts for ${email}`)
        return false
      }

      const isValid = storedOTP.otp === otp
      if (isValid) {
        await db.collection("otps").deleteOne({ email })
        console.log(`✅ OTP verified for ${email}`)
      } else {
        console.log(`❌ Invalid OTP for ${email}. Attempt ${storedOTP.attempts + 1}/3`)
      }

      return isValid
    } catch (error) {
      console.error(`❌ Error verifying OTP for ${email}:`, error)
      return false
    }
  }

  async getOTPInfo(email: string) {
    try {
      const db = await getDatabase()
      return await db.collection("otps").findOne({ email })
    } catch (error) {
      console.error(`❌ Error getting OTP info for ${email}:`, error)
      return null
    }
  }
}

const otpManager = new OTPManager()

// Password functions
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs")
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs")
  return await bcrypt.compare(password, hashedPassword)
}

// JWT functions
export async function generateToken(payload: any): Promise<string> {
  const jwt = await import("jsonwebtoken")
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const jwt = await import("jsonwebtoken")
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log("✅ JWT token verified successfully")
    return decoded
  } catch (error) {
    console.error("❌ JWT token verification failed:", error)
    return null
  }
}

// User functions
export async function createUser(userData: any) {
  const db = await getDatabase()
  return await db.collection("users").insertOne(userData)
}

export async function getUserByEmail(email: string) {
  const db = await getDatabase()
  return await db.collection("users").findOne({ email })
}

export async function updateUserLogin(userId: string) {
  const db = await getDatabase()
  return await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastLogin: new Date() } }
  )
}

// OTP functions
export async function generateOTP(email: string): Promise<string> {
  return await otpManager.generateOTP(email)
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  return await otpManager.verifyOTP(email, otp)
}

export async function getOTPInfo(email: string) {
  return await otpManager.getOTPInfo(email)
}

// Database operations with comprehensive error handling
export async function getUserById(userId: string) {
  try {
    const db = await getDatabase()
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })
    console.log(`✅ User lookup by ID ${userId}: ${user ? "found" : "not found"}`)
    return user
  } catch (error) {
    console.error("❌ Get user by ID failed:", error)
    throw new Error("Database query failed")
  }
}

export async function updateUserPoints(userId: string, points: number) {
  try {
    const db = await getDatabase()
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $inc: { points },
        $set: { lastActivity: new Date() },
      },
    )
    console.log(`✅ Updated points for user ${userId}: +${points}`)
    return result
  } catch (error) {
    console.error("❌ Update user points failed:", error)
    throw new Error("Database update failed")
  }
}

export async function getLeaderboard(limit = 10) {
  try {
    const db = await getDatabase()
    const leaderboard = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .sort({ points: -1 })
      .limit(limit)
      .toArray()

    console.log(`✅ Retrieved leaderboard with ${leaderboard.length} users`)
    return leaderboard
  } catch (error) {
    console.error("❌ Get leaderboard failed:", error)
    throw new Error("Database query failed")
  }
}

// Game score operations
export async function saveGameScore(userId: string, gameId: string, score: number) {
  try {
    const db = await getDatabase()

    // Calculate points based on game type
    let points = 0
    switch (gameId) {
      case "recycling-rush":
        points = Math.floor(score / 10)
        break
      case "energy-puzzle":
        points = score * 5
        break
      case "eco-quiz":
        points = score * 10
        break
      default:
        points = score
    }

    // Save game score
    const gameScore = {
      userId: new ObjectId(userId),
      gameId,
      score,
      points,
      playedAt: new Date(),
    }

    await db.collection("game_scores").insertOne(gameScore)

    // Update user points
    console.log(`📊 Updating user ${userId} with ${points} points.`);
    await updateUserPoints(userId, points);

    // Update games played count
    console.log(` 게임 수를 업데이트 하는 사용자 ${userId}.`);
    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $inc: { gamesPlayed: 1 } });

    console.log(`✅ Database update attempted for user ${userId}: Points updated, Games Played incremented.`);
    console.log(`✅ Game score saved: ${gameId} - Score: ${score}, Points: ${points}`);
    return { score, points }
  } catch (error) {
    console.error("❌ Save game score failed:", error)
    throw new Error("Failed to save game score")
  }
}

export async function getUserGameStats(userId: string) {
  try {
    const db = await getDatabase()
    const stats = await db
      .collection("game_scores")
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $group: {
            _id: "$gameId",
            totalGames: { $sum: 1 },
            bestScore: { $max: "$score" },
            totalPoints: { $sum: "$points" },
            averageScore: { $avg: "$score" },
          },
        },
      ])
      .toArray()

    console.log(`✅ Retrieved game stats for user ${userId}`)
    return stats
  } catch (error) {
    console.error("❌ Get user game stats failed:", error)
    throw new Error("Database query failed")
  }
}
