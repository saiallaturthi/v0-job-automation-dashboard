import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { config } = body

    // Validate configuration
    if (!config.keywords || !config.locations) {
      return NextResponse.json({ success: false, error: "Missing required configuration fields" }, { status: 400 })
    }

    // In a real app, this would save to a database
    const savedConfig = {
      id: `config-${Date.now()}`,
      ...config,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: savedConfig,
      message: "Configuration saved successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save configuration" }, { status: 500 })
  }
}
