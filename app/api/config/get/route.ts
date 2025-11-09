import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Default configuration
    const config = {
      id: "config-default",
      keywords: "React, TypeScript, Node.js",
      locations: "Remote, San Francisco, New York",
      minSalary: "100000",
      maxSalary: "200000",
      experience: "mid-level",
      jobType: "full-time",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: config,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch configuration" }, { status: 500 })
  }
}
