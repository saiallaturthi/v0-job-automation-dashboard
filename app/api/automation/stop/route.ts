import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId } = body

    // Simulate Selenium automation stop
    const result = {
      sessionId,
      status: "stopped",
      finalStats: {
        applicationsApplied: 37,
        successRate: 92,
        timeElapsed: "2h 45m",
      },
    }

    return NextResponse.json({
      success: true,
      result,
      message: "Automation stopped successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to stop automation" }, { status: 500 })
  }
}
