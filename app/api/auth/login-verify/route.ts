import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP, generateToken, getUserByEmail, updateUserLogin } from "@/lib/auth-service"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  console.log("🔐 Login OTP verification request received")

  try {
    const { email, otp } = await req.json()
    console.log(`🔢 Verifying login OTP for: ${email}`)

    // Validate input
    if (!email || !otp) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp)
    if (!isValid) {
      console.log("❌ Invalid or expired OTP")
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Get user
    const user = await getUserByEmail(email)
    if (!user) {
      console.log("❌ User not found")
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update login info
    await updateUserLogin(user._id.toString())

    // Generate token
    const token = await generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })

    console.log("✅ Login successful")
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          points: user.points || 0,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Login verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
