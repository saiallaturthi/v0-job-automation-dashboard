"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Search, Loader2, CheckCircle2 } from "lucide-react"

interface ScrapedEmail {
  id: string
  email: string
  firstName: string
  lastName: string
  department: string
  role: string
  confidence: number
  source: string
}

export function CompanyEmailScraper() {
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emails, setEmails] = useState<ScrapedEmail[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [totalScraped, setTotalScraped] = useState(0)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleScrape = async () => {
    if (!companyName.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/company/scrape-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: companyName.trim() }),
      })

      const data = await response.json()
      setEmails(data.emails || [])
      setTotalScraped(data.totalScraped || 0)
      setSearchHistory([companyName, ...searchHistory.slice(0, 4)])
    } catch (error) {
      console.error("Error scraping emails:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (email: string, id: string) => {
    navigator.clipboard.writeText(email)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportEmails = () => {
    const csvContent = [
      ["Email", "First Name", "Last Name", "Department", "Role", "Confidence"],
      ...emails.map((e) => [e.email, e.firstName, e.lastName, e.department, e.role, e.confidence]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${companyName}-emails.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Company Email Scraper</CardTitle>
          <CardDescription>Search and scrape email addresses from any company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter company name (e.g., Google, Microsoft, Tesla)"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleScrape()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleScrape} disabled={isLoading || !companyName.trim()} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Scrape
                </>
              )}
            </Button>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((company) => (
                  <Badge
                    key={company}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setCompanyName(company)
                    }}
                  >
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Section */}
      {emails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-1">{emails.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Email Addresses Found</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-2">{totalScraped}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Records Scraped</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-3">
                  {(emails.reduce((sum, e) => sum + e.confidence, 0) / emails.length).toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">Average Confidence</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Table */}
      {emails.length > 0 && (
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Email Results for {companyName}</CardTitle>
              <CardDescription>{emails.length} email addresses found</CardDescription>
            </div>
            <Button onClick={exportEmails} variant="outline">
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.map((emailEntry) => (
                    <TableRow key={emailEntry.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{emailEntry.email}</TableCell>
                      <TableCell>{emailEntry.firstName}</TableCell>
                      <TableCell>{emailEntry.lastName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{emailEntry.department}</Badge>
                      </TableCell>
                      <TableCell>{emailEntry.role}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-chart-1 h-2 rounded-full"
                              style={{ width: `${emailEntry.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{emailEntry.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(emailEntry.email, emailEntry.id)}
                          className="gap-2"
                        >
                          {copiedId === emailEntry.id ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-chart-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && emails.length === 0 && companyName && (
        <Alert>
          <AlertDescription>No emails found for "{companyName}". Try a different company name.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
