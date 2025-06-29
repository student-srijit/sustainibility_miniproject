import { NextResponse } from "next/server"
import { healthCheck } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("🏥 Health check requested...")

    // Test MongoDB connection
    const dbHealth = await healthCheck()

    // Test environment variables
    const envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      JWT_SECRET: !!process.env.JWT_SECRET,
      HOST_EMAIL: !!process.env.HOST_EMAIL,
      HOST_EMAIL_PASSWORD: !!process.env.HOST_EMAIL_PASSWORD,
    }

    const allEnvPresent = Object.values(envCheck).every(Boolean)

    const healthStatus = {
      status: dbHealth.status === "healthy" && allEnvPresent ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      database: dbHealth,
      environment: {
        status: allEnvPresent ? "healthy" : "missing_variables",
        variables: envCheck,
      },
      services: {
        mongodb: dbHealth.status,
        authentication: envCheck.JWT_SECRET ? "ready" : "not_configured",
        email: envCheck.HOST_EMAIL && envCheck.HOST_EMAIL_PASSWORD ? "ready" : "not_configured",
      },
    }

    console.log("🏥 Health check result:", healthStatus.status)

    return NextResponse.json(healthStatus, {
      status: healthStatus.status === "healthy" ? 200 : 503,
    })
  } catch (error: any) {
    console.error("❌ Health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 500 },
    )
  }
}
