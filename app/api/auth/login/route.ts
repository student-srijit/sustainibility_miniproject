import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail, verifyPassword, generateOTP } from "@/lib/auth-service"
import { sendOTPEmail } from "@/lib/email-service"
import { testConnection } from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  console.log("🔑 Login request received")

  try {
    // Test database connection
    const dbConnected = await testConnection()
    if (!dbConnected) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 503 })
    }

    const { email, password } = await req.json()
    console.log(`🔐 Login attempt for: ${email}`)

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password")
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 })
    }

    // Check if user exists
    const user = await getUserByEmail(email)
    if (!user) {
      console.log("❌ User not found")
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      console.log("❌ Invalid password")
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate and send OTP
    const otp = await generateOTP(email)
    const emailSent = await sendOTPEmail(email, otp)

    if (!emailSent) {
      console.log("❌ Failed to send OTP email")
      return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 })
    }

    console.log("✅ Login OTP sent successfully")
    return NextResponse.json(
      {
        message: "OTP sent successfully",
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
