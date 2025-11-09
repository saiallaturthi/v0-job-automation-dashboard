import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { companyName } = await request.json()

    if (!companyName || companyName.trim() === "") {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    const mockEmails = generateMockEmails(companyName)

    return NextResponse.json({
      emails: mockEmails,
      totalScraped: mockEmails.length * 2,
      company: companyName,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Email scraping error:", error)
    return NextResponse.json({ error: "Failed to scrape emails" }, { status: 500 })
  }
}

function generateMockEmails(companyName: string) {
  const departments = ["Engineering", "Sales", "HR", "Marketing", "Product", "Operations"]
  const roles = ["Senior Engineer", "Recruiter", "HR Manager", "Product Manager", "Sales Director", "Tech Lead"]
  const firstNames = ["John", "Sarah", "Mike", "Emily", "David", "Jessica", "Robert", "Amanda"]
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]

  return Array.from({ length: 8 }, (_, i) => ({
    id: `email-${i}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}@${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    department: departments[i % departments.length],
    role: roles[i % roles.length],
    confidence: Math.floor(Math.random() * 30) + 70,
    source: "LinkedIn Profile",
  }))
}
