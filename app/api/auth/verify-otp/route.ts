import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP, createUser, generateToken, getUserByEmail } from "@/lib/auth-service"
import { sendWelcomeEmail } from "@/lib/email-service"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  console.log("🔐 OTP verification request received")

  try {
    const { email, otp, tempUser } = await req.json()
    console.log(`🔢 Verifying OTP for: ${email}`)

    // Validate input
    if (!email || !otp || !tempUser) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      console.log("❌ Email already registered")
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp)
    if (!isValid) {
      console.log("❌ Invalid or expired OTP")
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Create user in database
    const { name, hashedPassword } = tempUser
    const newUser = {
      name,
      email,
      password: hashedPassword,
      points: 0,
      createdAt: new Date(),
      emailVerified: true,
    }

    const result = await createUser(newUser)
    const userId = result.insertedId.toString()

    // Generate token
    const token = await generateToken({ userId, email, name })

    // Set secure cookie
    const cookieStore = cookies()
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    // Send welcome email (don't wait for it)
    sendWelcomeEmail(email, name).catch((error) => {
      console.error("Failed to send welcome email:", error)
    })

    console.log("✅ User created and verified successfully")
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: userId, name, email, points: 0 },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("❌ OTP verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
