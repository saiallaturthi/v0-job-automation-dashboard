"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Briefcase, Building2, MapPin, Send, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

interface RecruiterJob {
  id: string
  jobTitle: string
  company: string
  recruiterName: string
  recruiterEmail: string
  location: string
  postDate: string
  jobUrl: string
  technologies: string[]
  experience: string
  salary?: string
  emailSent?: boolean
}

export function LinkedInRecruiterJobs() {
  const [jobs, setJobs] = useState<RecruiterJob[]>([])
  const [loading, setLoading] = useState(false)
  const [scrapedCount, setScrapedCount] = useState(0)
  const [emailsCollected, setEmailsCollected] = useState(0)
  const [emailsSent, setEmailsSent] = useState(0)
  const [emailsOpened, setEmailsOpened] = useState(0)
  const [emailsClicked, setEmailsClicked] = useState(0)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  useEffect(() => {
    fetchRecruiterJobs()
    fetchEmailAnalytics()
  }, [])

  const fetchRecruiterJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/linkedin/recruiter-jobs")
      const data = await response.json()
      setJobs(data.jobs || [])
      setScrapedCount(data.totalScraped || 0)
      setEmailsCollected(data.emailsCollected || 0)
    } catch (error) {
      console.error("Failed to fetch recruiter jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmailAnalytics = async () => {
    try {
      const response = await fetch("/api/linkedin/email-analytics")
      const data = await response.json()
      setEmailsSent(data.emailsSent || 0)
      setEmailsOpened(data.emailsOpened || 0)
      setEmailsClicked(data.emailsClicked || 0)
    } catch (error) {
      console.error("Failed to fetch email analytics:", error)
    }
  }

  const startScraping = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/linkedin/scrape", { method: "POST" })
      const data = await response.json()
      setScrapedCount(data.scrapedCount || 0)
      await fetchRecruiterJobs()
    } catch (error) {
      console.error("Failed to start scraping:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendEmailToRecruiter = async (job: RecruiterJob) => {
    setSendingEmail(job.id)
    try {
      const response = await fetch("/api/linkedin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          recruiterEmail: job.recruiterEmail,
          recruiterName: job.recruiterName,
          jobTitle: job.jobTitle,
          company: job.company,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setEmailsSent(emailsSent + 1)
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, emailSent: true } : j)))
      }
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setSendingEmail(null)
    }
  }

  const sendBulkEmails = async () => {
    setSendingEmail("bulk")
    try {
      const response = await fetch("/api/linkedin/send-bulk-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobs: jobs.filter((j) => !j.emailSent),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setEmailsSent(emailsSent + data.count)
        await fetchRecruiterJobs()
      }
    } catch (error) {
      console.error("Failed to send bulk emails:", error)
    } finally {
      setSendingEmail(null)
    }
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
  }

  const openRate = emailsSent > 0 ? ((emailsOpened / emailsSent) * 100).toFixed(1) : 0
  const clickRate = emailsSent > 0 ? ((emailsClicked / emailsSent) * 100).toFixed(1) : 0
  const unsent = jobs.filter((j) => !j.emailSent).length

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jobs Scraped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{scrapedCount}</div>
              <Briefcase className="text-chart-1 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emails Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{emailsCollected}</div>
              <Mail className="text-chart-2 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{emailsSent}</div>
              <Send className="text-chart-3 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{openRate}%</div>
              <TrendingUp className="text-chart-4 h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emails Opened</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{emailsOpened}</div>
              <CheckCircle className="text-chart-1 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emails Clicked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{emailsClicked}</div>
              <AlertCircle className="text-chart-2 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{clickRate}%</div>
              <TrendingUp className="text-chart-3 h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Section */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Campaign Controls</CardTitle>
          <CardDescription>Scrape LinkedIn job posts and send emails to recruiters</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button onClick={startScraping} disabled={loading} variant="outline">
            {loading ? "Scraping..." : "Start LinkedIn Scraping"}
          </Button>
          <Button onClick={sendBulkEmails} disabled={sendingEmail === "bulk" || unsent === 0} className="bg-chart-3">
            {sendingEmail === "bulk" ? "Sending..." : `Send ${unsent} Emails`}
          </Button>
          <Button onClick={fetchEmailAnalytics} variant="ghost">
            Refresh Analytics
          </Button>
        </CardContent>
      </Card>

      {/* Recruiter Jobs Table */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Recruiter Job Posts</CardTitle>
          <CardDescription>Found {jobs.length} job postings with recruiter email addresses</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No jobs scraped yet. Start scraping to populate this list.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{job.jobTitle}</h3>
                        <Badge variant="secondary">{job.experience}</Badge>
                        {job.emailSent && <Badge className="bg-chart-1">Email Sent</Badge>}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="bg-chart-1/10">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Salary if available */}
                      {job.salary && <p className="text-sm font-medium text-chart-1 pt-1">{job.salary}</p>}
                    </div>

                    {/* Recruiter Info */}
                    <div className="flex-shrink-0 md:border-l border-border md:pl-4 space-y-2">
                      <div className="text-sm">
                        <p className="text-muted-foreground text-xs">Recruiter</p>
                        <p className="font-medium text-foreground">{job.recruiterName}</p>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground text-xs">Email</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded text-foreground break-all">
                            {job.recruiterEmail}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyEmail(job.recruiterEmail)}
                            className="h-8 w-8 p-0"
                          >
                            📋
                          </Button>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => sendEmailToRecruiter(job)}
                        disabled={sendingEmail === job.id || job.emailSent}
                        className="w-full mt-2"
                      >
                        {sendingEmail === job.id ? "Sending..." : job.emailSent ? "Sent" : "Send Email"}
                      </Button>

                      <p className="text-xs text-muted-foreground pt-2">{job.postDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
