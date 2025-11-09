import { NextResponse } from "next/server"

// Mock data - replace with actual LinkedIn scraping logic
const mockRecruiterJobs = [
  {
    id: "1",
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc",
    recruiterName: "Sarah Johnson",
    recruiterEmail: "sarah.johnson@techcorp.com",
    location: "San Francisco, CA",
    postDate: "2 days ago",
    jobUrl: "https://linkedin.com/jobs/view/1234567",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    experience: "5+ years",
    salary: "$150,000 - $200,000",
  },
  {
    id: "2",
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    recruiterName: "Michael Chen",
    recruiterEmail: "michael.chen@startupxyz.com",
    location: "New York, NY",
    postDate: "1 day ago",
    jobUrl: "https://linkedin.com/jobs/view/7654321",
    technologies: ["Next.js", "Python", "AWS", "MongoDB"],
    experience: "3+ years",
    salary: "$120,000 - $160,000",
  },
  {
    id: "3",
    jobTitle: "Frontend Developer",
    company: "DesignStudio Co",
    recruiterName: "Emily Rodriguez",
    recruiterEmail: "emily.rodriguez@designstudio.co",
    location: "Austin, TX",
    postDate: "3 days ago",
    jobUrl: "https://linkedin.com/jobs/view/9876543",
    technologies: ["Vue.js", "Tailwind CSS", "JavaScript"],
    experience: "2+ years",
    salary: "$100,000 - $140,000",
  },
  {
    id: "4",
    jobTitle: "Backend Engineer",
    company: "CloudServices Ltd",
    recruiterName: "James Wilson",
    recruiterEmail: "james.wilson@cloudservices.com",
    location: "Seattle, WA",
    postDate: "1 week ago",
    jobUrl: "https://linkedin.com/jobs/view/5555555",
    technologies: ["Go", "Kubernetes", "Docker", "PostgreSQL"],
    experience: "4+ years",
    salary: "$130,000 - $170,000",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      jobs: mockRecruiterJobs,
      totalScraped: mockRecruiterJobs.length,
      emailsCollected: mockRecruiterJobs.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recruiter jobs" }, { status: 500 })
  }
}
