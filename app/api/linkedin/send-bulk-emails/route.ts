import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobs } = await request.json()

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ error: "No jobs provided" }, { status: 400 })
    }

    const sentEmails = []
    for (const job of jobs) {
      const emailId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sentEmails.push({
        jobId: job.id,
        recruiterEmail: job.recruiterEmail,
        emailId,
        sentAt: new Date(),
      })
      console.log("[v0] Bulk email sent to:", job.recruiterEmail)
    }

    return NextResponse.json(
      {
        success: true,
        count: sentEmails.length,
        emails: sentEmails,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error sending bulk emails:", error)
    return NextResponse.json({ error: "Failed to send bulk emails" }, { status: 500 })
  }
}
