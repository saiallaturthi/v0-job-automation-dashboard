import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Simulate getting current session status
    const currentStatus = {
      isRunning: false,
      sessionId: null,
      stats: {
        totalApplications: 247,
        successRate: 8.9,
        pendingInterviews: 12,
        rejections: 18,
        applicationsThisSession: 0,
        successRateThisSession: 0,
      },
      lastUpdated: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: currentStatus,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch status" }, { status: 500 })
  }
}
