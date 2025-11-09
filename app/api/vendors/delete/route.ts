import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    // In production, delete from database
    return NextResponse.json({ success: true, message: "Vendor deleted successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete vendor" }, { status: 500 })
  }
}
