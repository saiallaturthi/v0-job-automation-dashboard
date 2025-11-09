import { type NextRequest, NextResponse } from "next/server"

// This is a mock implementation. In production, you would save to a database
const vendorsStore: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newVendor = {
      id: Date.now().toString(),
      ...body,
      added_date: new Date().toISOString().split("T")[0],
    }

    vendorsStore.push(newVendor)

    return NextResponse.json(
      { success: true, vendor: newVendor, message: "Vendor added successfully" },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add vendor" }, { status: 500 })
  }
}
