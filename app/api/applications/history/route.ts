import { NextResponse } from "next/server"

const mockApplications = [
  {
    id: 1,
    company: "TechCorp",
    position: "Senior Developer",
    date: "2024-11-10",
    status: "Applied",
    salary: "$120k-140k",
    contactPerson: "John Smith",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    jobLink: "https://example.com/jobs/123",
  },
  {
    id: 2,
    company: "StartUp Inc",
    position: "Full Stack Engineer",
    date: "2024-11-09",
    status: "Interview",
    salary: "$100k-130k",
    contactPerson: "Sarah Johnson",
    technologies: ["Vue.js", "Python", "FastAPI", "MongoDB"],
    jobLink: "https://example.com/jobs/124",
  },
  {
    id: 3,
    company: "DataFlow Systems",
    position: "Backend Engineer",
    date: "2024-11-08",
    status: "Rejected",
    salary: "$110k-135k",
    contactPerson: "Mike Chen",
    technologies: ["Java", "Spring Boot", "AWS", "Kubernetes"],
    jobLink: "https://example.com/jobs/125",
  },
  {
    id: 4,
    company: "CloudBase",
    position: "DevOps Engineer",
    date: "2024-11-07",
    status: "Applied",
    salary: "$130k-160k",
    contactPerson: "Emma Davis",
    technologies: ["Docker", "Kubernetes", "Terraform", "CI/CD"],
    jobLink: "https://example.com/jobs/126",
  },
  {
    id: 5,
    company: "AI Innovations",
    position: "ML Engineer",
    date: "2024-11-06",
    status: "Applied",
    salary: "$140k-170k",
    contactPerson: "Alex Rodriguez",
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS SageMaker"],
    jobLink: "https://example.com/jobs/127",
  },
  {
    id: 6,
    company: "FinTech Solutions",
    position: "Backend Developer",
    date: "2024-11-05",
    status: "Offer",
    salary: "$125k-150k",
    contactPerson: "Lisa Park",
    technologies: ["Go", "gRPC", "PostgreSQL", "Redis"],
    jobLink: "https://example.com/jobs/128",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let results = mockApplications

    if (status) {
      results = results.filter((app) => app.status === status)
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 })
  }
}
