import crypto from "crypto"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "sustainability-website-super-secret-key-2024"

// OTP storage (in production, use Redis or similar)
const otpStore: Record<string, { otp: string; expires: number }> = {}

// Hash password (using dynamic import)
export async function hashPassword(password: string) {
  const bcrypt = await import("bcryptjs")
  return await bcrypt.hash(password, 12)
}

// Verify password (using dynamic import)
export async function verifyPassword(password: string, hashedPassword: string) {
  const bcrypt = await import("bcryptjs")
  return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token (using dynamic import)
export async function generateToken(payload: any) {
  const jwt = await import("jsonwebtoken")
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// Verify JWT token (using dynamic import)
export async function verifyToken(token: string) {
  try {
    const jwt = await import("jsonwebtoken")
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Generate OTP
export function generateOTP(email: string) {
  const otp = crypto.randomInt(100000, 999999).toString()
  const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

  otpStore[email] = { otp, expires }
  return otp
}

// Verify OTP
export function verifyOTP(email: string, otp: string) {
  const storedOTP = otpStore[email]

  if (!storedOTP) return false
  if (storedOTP.expires < Date.now()) {
    delete otpStore[email]
    return false
  }

  const isValid = storedOTP.otp === otp
  if (isValid) delete otpStore[email]

  return isValid
}

// Get user by email (server-side only)
export async function getUserByEmail(email: string) {
  const client = await clientPromise
  const db = client.db("loginDB")

  return await db.collection("users").findOne({ email })
}

// Create user (server-side only)
export async function createUser(userData: any) {
  const client = await clientPromise
  const db = client.db("loginDB")

  return await db.collection("users").insertOne(userData)
}

// Update user points (server-side only)
export async function updateUserPoints(userId: string, points: number) {
  const client = await clientPromise
  const db = client.db("loginDB")

  return await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $inc: { points } })
}

// Get leaderboard (server-side only)
export async function getLeaderboard(limit = 10) {
  const client = await clientPromise
  const db = client.db("loginDB")

  return await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .sort({ points: -1 })
    .limit(limit)
    .toArray()
}
