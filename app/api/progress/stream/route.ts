import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate real-time progress updates
    const encoder = new TextEncoder()
    let counter = 0

    const customReadable = new ReadableStream({
      async start(controller) {
        // Simulate periodic updates
        while (counter < 100) {
          counter += Math.random() * 10
          const data = {
            applied: Math.floor(counter),
            pending: Math.floor(100 - counter),
            successfulResponses: Math.floor(counter * 0.08),
            timestamp: new Date(),
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

          // Wait 1 second before next update
          await new Promise((resolve) => setTimeout(resolve, 1000))

          if (counter >= 100) {
            controller.close()
          }
        }
      },
    })

    return new Response(customReadable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to stream progress" }, { status: 500 })
  }
}
