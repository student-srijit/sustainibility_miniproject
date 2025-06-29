import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, generateOTP, getUserByEmail } from "@/lib/auth-service"
import { sendOTPEmail } from "@/lib/email-service"

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, allows special characters)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Processing signup request")
    const body = await request.json()
    console.log("📦 Request body:", { ...body, password: "[REDACTED]" })

    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      console.log("❌ Missing required fields:", { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasPassword: !!password 
      })
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      console.log("❌ Invalid email format:", email)
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (!PASSWORD_REGEX.test(password)) {
      console.log("❌ Password does not meet requirements")
      const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password)
      }
      
      const missingRequirements = []
      if (!requirements.minLength) missingRequirements.push("at least 8 characters")
      if (!requirements.hasUppercase) missingRequirements.push("an uppercase letter")
      if (!requirements.hasLowercase) missingRequirements.push("a lowercase letter")
      if (!requirements.hasNumber) missingRequirements.push("a number")

      return NextResponse.json(
        { 
          error: "Password requirements not met",
          message: `Your password needs ${missingRequirements.join(", ")}`,
          requirements
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    console.log("🔍 Checking if user exists:", email)
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      console.log("❌ Email already registered:", email)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Hash password
    console.log("🔒 Hashing password")
    const hashedPassword = await hashPassword(password)

    // Generate OTP
    console.log("🔢 Generating OTP")
    const otp = await generateOTP(email)

    // Send OTP email
    console.log("📧 Sending OTP email")
    const emailSent = await sendOTPEmail(email, otp)
    if (!emailSent) {
      console.log("❌ Failed to send OTP email")
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again later." },
        { status: 500 }
      )
    }

    // Return temp user data
    console.log("✅ Signup successful, OTP sent")
    return NextResponse.json({
      message: "OTP sent successfully",
      tempUser: {
        name,
        email,
        hashedPassword,
      },
    })
  } catch (error: any) {
    console.error("❌ Signup error:", error)
    return NextResponse.json(
      { 
        error: "An unexpected error occurred. Please try again later.",
        details: error.message
      },
      { status: 500 }
    )
  }
}
