import { type NextRequest, NextResponse } from "next/server"

// Mock consultant data - replace with actual LinkedIn scraping logic
const mockConsultants = [
  {
    id: "1",
    name: "Sarah Johnson",
    linkedinId: "sarah-johnson-react",
    linkedinUrl: "https://linkedin.com/in/sarah-johnson-react",
    title: "Senior React Developer",
    technologies: ["React", "TypeScript", "Node.js", "AWS"],
    location: "San Francisco, CA",
    experience: 6,
    education: [{ school: "UC Berkeley", degree: "BS Computer Science" }],
    previousCompanies: ["Google", "Meta", "Stripe"],
    profileImage: "/diverse-group-smiling.png",
  },
  {
    id: "2",
    name: "Alex Chen",
    linkedinId: "alex-chen-fullstack",
    linkedinUrl: "https://linkedin.com/in/alex-chen-fullstack",
    title: "Full Stack Engineer",
    technologies: ["React", "Python", "PostgreSQL", "Docker"],
    location: "San Francisco, CA",
    experience: 4,
    education: [{ school: "Stanford", degree: "MS Computer Science" }],
    previousCompanies: ["Airbnb", "Uber"],
    profileImage: "/diverse-group-meeting.png",
  },
  {
    id: "3",
    name: "Maria Garcia",
    linkedinId: "maria-garcia-aws",
    linkedinUrl: "https://linkedin.com/in/maria-garcia-aws",
    title: "Cloud Solutions Architect",
    technologies: ["AWS", "Kubernetes", "Python", "Terraform"],
    location: "San Francisco, CA",
    experience: 7,
    education: [{ school: "MIT", degree: "BS Information Technology" }],
    previousCompanies: ["Amazon", "Microsoft", "IBM"],
    profileImage: "/portrait-thoughtful-woman.png",
  },
  {
    id: "4",
    name: "James Wilson",
    linkedinId: "james-wilson-ml",
    linkedinUrl: "https://linkedin.com/in/james-wilson-ml",
    title: "Machine Learning Engineer",
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS"],
    location: "San Francisco, CA",
    experience: 5,
    education: [{ school: "Carnegie Mellon", degree: "PhD Machine Learning" }],
    previousCompanies: ["DeepMind", "Tesla", "OpenAI"],
    profileImage: "/portrait-thoughtful-man.png",
  },
  {
    id: "5",
    name: "Priya Patel",
    linkedinId: "priya-patel-backend",
    linkedinUrl: "https://linkedin.com/in/priya-patel-backend",
    title: "Backend Systems Engineer",
    technologies: ["Go", "Rust", "PostgreSQL", "Redis"],
    location: "San Francisco, CA",
    experience: 8,
    education: [{ school: "IIT Delhi", degree: "BTech Computer Science" }],
    previousCompanies: ["Booking.com", "PayPal", "Stripe"],
    profileImage: "/portrait-of-priya.png",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { technology, location, experience } = body

    // Filter consultants based on search criteria
    let filtered = mockConsultants.filter((consultant) => {
      const techMatch = consultant.technologies.some((tech) => tech.toLowerCase().includes(technology.toLowerCase()))
      const locationMatch = consultant.location.toLowerCase().includes(location.toLowerCase())

      let experienceMatch = true
      if (experience === "junior") experienceMatch = consultant.experience <= 2
      if (experience === "mid") experienceMatch = consultant.experience > 2 && consultant.experience <= 5
      if (experience === "senior") experienceMatch = consultant.experience > 5

      return techMatch && locationMatch && experienceMatch
    })

    // If no exact matches, broaden the search
    if (filtered.length === 0) {
      filtered = mockConsultants.slice(0, 3)
    }

    return NextResponse.json({
      success: true,
      consultants: filtered,
      total: filtered.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
