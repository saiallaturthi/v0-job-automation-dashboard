"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "./stats-card"
import { ApplicationHistory } from "./application-history"
import { AutomationControls } from "./automation-controls"
import { JobConfig } from "./job-config"
import { ProgressMonitor } from "./progress-monitor"
import { LinkedInRecruiterJobs } from "./linkedin-recruiter-jobs"
import { CompanyEmailScraper } from "./company-email-scraper"
import { RecruiterTalentSearch } from "./recruiter-talent-search"
import { VendorManagement } from "./vendor-management"
import { EmailCampaignReport } from "./email-campaign-report"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">dashboard</h1>
              <p className="text-muted-foreground mt-1">Automated job application system powered by Selenium</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-chart-1 animate-pulse" : "bg-muted"}`} />
              <span className="text-sm font-medium text-muted-foreground">{isRunning ? "Running" : "Idle"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-9 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn Jobs</TabsTrigger>
              <TabsTrigger value="email-report">Email Report</TabsTrigger>
              <TabsTrigger value="company">Company Emails</TabsTrigger>
              <TabsTrigger value="recruiter">Find Talent</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Job Application Automation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Total Applications"
                    value="247"
                    description="Applications sent this month"
                    trend="12% up from last month"
                    trendUp={true}
                    icon="📝"
                  />
                  <StatsCard
                    title="Success Rate"
                    value="8.9%"
                    description="Positive responses"
                    trend="2% improvement"
                    trendUp={true}
                    icon="✓"
                  />
                  <StatsCard
                    title="Pending Interviews"
                    value="12"
                    description="Awaiting responses"
                    trend="3 new this week"
                    trendUp={true}
                    icon="📅"
                  />
                  <StatsCard
                    title="Rejections"
                    value="18"
                    description="Automated responses"
                    trend="Updated today"
                    trendUp={false}
                    icon="✗"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">LinkedIn Recruiter Jobs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Jobs Scraped"
                    value="156"
                    description="Active recruiter job postings"
                    trend="23 new today"
                    trendUp={true}
                    icon="🔗"
                  />
                  <StatsCard
                    title="Recruiter Emails"
                    value="89"
                    description="Unique recruiter contacts"
                    trend="15 new this week"
                    trendUp={true}
                    icon="📧"
                  />
                  <StatsCard
                    title="Technologies Found"
                    value="342"
                    description="Unique tech skills required"
                    trend="38 new skills"
                    trendUp={true}
                    icon="💻"
                  />
                  <StatsCard
                    title="Emails Sent to Recruiters"
                    value="156"
                    description="Total outreach emails sent"
                    trend="32 today"
                    trendUp={true}
                    icon="📨"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Company Email Scraping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Companies Scraped"
                    value="42"
                    description="Total companies processed"
                    trend="8 new this week"
                    trendUp={true}
                    icon="🏢"
                  />
                  <StatsCard
                    title="Emails Collected"
                    value="1,234"
                    description="Total email addresses"
                    trend="142 new emails"
                    trendUp={true}
                    icon="📧"
                  />
                  <StatsCard
                    title="Avg Emails/Company"
                    value="29.4"
                    description="Average per company"
                    trend="2.1 increase"
                    trendUp={true}
                    icon="📊"
                  />
                  <StatsCard
                    title="Valid Rate"
                    value="94.2%"
                    description="Email validation rate"
                    trend="0.5% improved"
                    trendUp={true}
                    icon="✓"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Talent Search & Recruitment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Consultants Found"
                    value="523"
                    description="Total consultants matched"
                    trend="67 new matches"
                    trendUp={true}
                    icon="👥"
                  />
                  <StatsCard
                    title="Searches Completed"
                    value="18"
                    description="Total saved searches"
                    trend="3 new searches"
                    trendUp={true}
                    icon="🔍"
                  />
                  <StatsCard
                    title="Top Technology"
                    value="React.js"
                    description="Most searched skill"
                    trend="42 candidates"
                    trendUp={true}
                    icon="⭐"
                  />
                  <StatsCard
                    title="Top Location"
                    value="USA"
                    description="Most candidates"
                    trend="312 consultants"
                    trendUp={true}
                    icon="📍"
                  />
                </div>
              </div>

              {/* Recent Reports Summary */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Recent Reports Summary</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border border-border hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">LinkedIn Email Campaign</CardTitle>
                      <CardDescription>Emails sent to recruiters with targeted technologies</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Emails Sent:</span>
                        <span className="text-lg font-semibold">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Unique Recipients:</span>
                        <span className="text-lg font-semibold">89</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Top Technology Targeted:</span>
                        <span className="text-lg font-semibold">React.js</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={() => setActiveTab("email-report")}
                      >
                        View Full Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-border hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">Vendor Management</CardTitle>
                      <CardDescription>All contacts collected from automation modules</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Vendors:</span>
                        <span className="text-lg font-semibold">127</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Unique Companies:</span>
                        <span className="text-lg font-semibold">89</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Emails with Phone:</span>
                        <span className="text-lg font-semibold">94</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={() => setActiveTab("vendors")}
                      >
                        View All Vendors
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Progress Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Progress</CardTitle>
                    <CardDescription>Real-time automation status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProgressMonitor isRunning={isRunning} />
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Manage automation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full"
                      onClick={() => setIsRunning(!isRunning)}
                      variant={isRunning ? "destructive" : "default"}
                    >
                      {isRunning ? "Stop Automation" : "Start Automation"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Recent Applications
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Export All Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <ApplicationHistory />
            </TabsContent>

            <TabsContent value="linkedin">
              <LinkedInRecruiterJobs />
            </TabsContent>

            {/* Email Campaign Report Tab */}
            <TabsContent value="email-report">
              <EmailCampaignReport />
            </TabsContent>

            {/* Company Email Scraper Tab */}
            <TabsContent value="company">
              <CompanyEmailScraper />
            </TabsContent>

            {/* Recruiter Talent Search Tab */}
            <TabsContent value="recruiter">
              <RecruiterTalentSearch />
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors">
              <VendorManagement />
            </TabsContent>

            {/* Controls Tab */}
            <TabsContent value="controls">
              <AutomationControls isRunning={isRunning} setIsRunning={setIsRunning} />
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="config">
              <JobConfig />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
