import { NextResponse } from "next/server"

// Mock data - Replace with actual database queries
const mockCampaignData = [
  {
    id: "1",
    recruiterName: "Sarah Johnson",
    recruiterEmail: "sarah.johnson@techcorp.com",
    company: "TechCorp",
    emailsSent: 5,
    technologies: ["React", "Node.js", "TypeScript"],
    sentDate: "2024-01-15",
  },
  {
    id: "2",
    recruiterName: "Michael Chen",
    recruiterEmail: "m.chen@innovate.io",
    company: "Innovate Solutions",
    emailsSent: 8,
    technologies: ["Python", "Django", "PostgreSQL"],
    sentDate: "2024-01-14",
  },
  {
    id: "3",
    recruiterName: "Emily Watson",
    recruiterEmail: "emily@cloudtech.co",
    company: "CloudTech",
    emailsSent: 12,
    technologies: ["AWS", "Kubernetes", "Go"],
    sentDate: "2024-01-16",
  },
  {
    id: "4",
    recruiterName: "David Martinez",
    recruiterEmail: "d.martinez@webdev.com",
    company: "WebDev Pro",
    emailsSent: 6,
    technologies: ["Vue.js", "Nuxt", "JavaScript"],
    sentDate: "2024-01-13",
  },
  {
    id: "5",
    recruiterName: "Lisa Anderson",
    recruiterEmail: "lisa.anderson@mobilesys.net",
    company: "MobileSys",
    emailsSent: 9,
    technologies: ["React Native", "Flutter", "Swift"],
    sentDate: "2024-01-15",
  },
  {
    id: "6",
    recruiterName: "John Brooks",
    recruiterEmail: "j.brooks@aigenius.com",
    company: "AI Genius",
    emailsSent: 7,
    technologies: ["Python", "TensorFlow", "Machine Learning"],
    sentDate: "2024-01-14",
  },
  {
    id: "7",
    recruiterName: "Amanda Lee",
    recruiterEmail: "amanda@securedata.io",
    company: "SecureData",
    emailsSent: 4,
    technologies: ["Security", "Encryption", "Cybersecurity"],
    sentDate: "2024-01-12",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      reports: mockCampaignData,
      totalEmails: mockCampaignData.reduce((sum, r) => sum + r.emailsSent, 0),
      totalRecruiters: mockCampaignData.length,
    })
  } catch (error) {
    console.error("Error fetching campaign report:", error)
    return NextResponse.json({ error: "Failed to fetch campaign report" }, { status: 500 })
  }
}
