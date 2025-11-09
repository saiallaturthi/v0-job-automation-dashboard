import { NextResponse } from "next/server"

// Mock data - in production this would come from a database
const mockVendors = [
  {
    id: "1",
    company_name: "TechCorp Solutions",
    contact_name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1-555-0123",
    linkedin_profile: "linkedin.com/in/johnsmith",
    source_module: "LinkedIn Recruiter",
    added_date: "2024-11-09",
    notes: "HR Manager - React hiring",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ success: true, vendors: mockVendors }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch vendors" }, { status: 500 })
  }
}
