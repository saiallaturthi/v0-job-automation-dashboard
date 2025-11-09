"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, DownloadCloud, Filter, Copy, Check } from "lucide-react"

interface LinkedInJobEmailReport {
  id: string
  recruiterId: string
  recruiterName: string
  recruiterEmail: string
  company: string
  emailsSent: number
  technologies: string[]
  sentDate: string
}

export function EmailCampaignReport() {
  const [reports, setReports] = useState<LinkedInJobEmailReport[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"emails" | "name">("emails")
  const [allTechs, setAllTechs] = useState<string[]>([])
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  useEffect(() => {
    fetchCampaignReport()
  }, [])

  const fetchCampaignReport = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/linkedin/campaign-report")
      const data = await response.json()
      setReports(data.reports || [])

      const techs = new Set<string>()
      data.reports?.forEach((report: LinkedInJobEmailReport) => {
        report.technologies.forEach((tech) => techs.add(tech))
      })
      setAllTechs(Array.from(techs).sort())
    } catch (error) {
      console.error("Failed to fetch campaign report:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = selectedTech ? reports.filter((r) => r.technologies.includes(selectedTech)) : reports

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case "emails":
        return b.emailsSent - a.emailsSent
      case "name":
        return a.recruiterName.localeCompare(b.recruiterName)
      default:
        return 0
    }
  })

  const totalEmails = reports.reduce((sum, r) => sum + r.emailsSent, 0)

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  const exportToCSV = () => {
    const headers = ["Recruiter Name", "Email", "Company", "Emails Sent", "Technologies", "Sent Date"]

    const rows = sortedReports.map((r) => [
      r.recruiterName,
      r.recruiterEmail,
      r.company,
      r.emailsSent,
      r.technologies.join("; "),
      r.sentDate,
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `linkedin-jobs-email-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-foreground">{totalEmails}</div>
              <Mail className="text-chart-1 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-foreground">{reports.length}</div>
              <Mail className="text-chart-2 h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters & Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              onClick={() => setSelectedTech(null)}
              size="sm"
            >
              All Technologies
            </Button>
            {allTechs.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                onClick={() => setSelectedTech(tech)}
                size="sm"
                className="text-xs"
              >
                {tech}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            {(["emails", "name"] as const).map((sortOption) => (
              <Button
                key={sortOption}
                variant={sortBy === sortOption ? "default" : "outline"}
                onClick={() => setSortBy(sortOption)}
                size="sm"
                className="text-xs capitalize"
              >
                {sortOption === "emails" ? "Emails Sent" : "Name"}
              </Button>
            ))}
          </div>

          <Button onClick={exportToCSV} className="w-full gap-2 bg-transparent" variant="outline">
            <DownloadCloud className="h-4 w-4" />
            Export to CSV
          </Button>
        </CardContent>
      </Card>

      {/* Report Table */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>LinkedIn Jobs Email Campaign Report</CardTitle>
          <CardDescription>
            Showing {sortedReports.length} of {reports.length} recruiters
            {selectedTech && ` (filtered by ${selectedTech})`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No LinkedIn job emails sent yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Recruiter Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Company</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Emails Sent</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                      Technologies Targeted
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Sent Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReports.map((report) => (
                    <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{report.recruiterName}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{report.recruiterEmail}</span>
                          <button
                            onClick={() => copyEmail(report.recruiterEmail)}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {copiedEmail === report.recruiterEmail ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">{report.company}</td>
                      <td className="py-3 px-4 text-center font-bold text-lg text-chart-1">{report.emailsSent}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {report.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {report.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{report.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{report.sentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
