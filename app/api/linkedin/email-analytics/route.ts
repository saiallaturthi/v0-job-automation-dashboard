import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from a database or email service provider (SendGrid, Mailgun, etc.)
    const analytics = {
      emailsSent: 156,
      emailsDelivered: 152,
      emailsBounced: 4,
      emailsOpened: 47,
      emailsClicked: 12,
      emailsReplied: 3,
      deliveryRate: 97.4,
      openRate: 30.9,
      clickRate: 7.7,
      replyRate: 1.9,
      lastUpdated: new Date(),
    }

    return NextResponse.json(analytics, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching email analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
