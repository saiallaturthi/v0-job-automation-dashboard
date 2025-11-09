import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const applications = [
  {
    id: 1,
    company: "TechCorp",
    position: "Senior Developer",
    date: "2024-11-10",
    status: "Applied",
    salary: "$120k-140k",
    contactPerson: "John Smith",
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
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
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Applied":
      return "bg-blue-500/20 text-chart-2"
    case "Interview":
      return "bg-chart-4/20 text-chart-4"
    case "Offer":
      return "bg-chart-1/20 text-chart-1"
    case "Rejected":
      return "bg-destructive/20 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ApplicationHistory() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Application History</CardTitle>
        <CardDescription>Track all your job applications with details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-chart-1">{applications.length}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-chart-4">
                {applications.filter((a) => a.status === "Interview").length}
              </div>
              <div className="text-sm text-muted-foreground">Interviews</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-chart-1">
                {applications.filter((a) => a.status === "Offer").length}
              </div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Company</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Technologies</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr
                    key={app.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      idx % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-4 py-4 text-foreground font-medium">{app.company}</td>
                    <td className="px-4 py-4 text-foreground text-sm">{app.position}</td>
                    <td className="px-4 py-4 text-foreground text-sm font-medium">{app.contactPerson}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {app.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-sm">{app.salary}</td>
                    <td className="px-4 py-4 text-muted-foreground text-sm">{app.date}</td>
                    <td className="px-4 py-4">
                      <Badge className={`${getStatusColor(app.status)}`}>{app.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
