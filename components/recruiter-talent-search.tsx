"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Download, ExternalLink } from "lucide-react"

interface Consultant {
  id: string
  name: string
  linkedinId: string
  linkedinUrl: string
  title: string
  technologies: string[]
  location: string
  experience: number
  education: {
    school: string
    degree: string
  }[]
  previousCompanies: string[]
  profileImage: string
}

export function RecruiterTalentSearch() {
  const [searchTech, setSearchTech] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Consultant[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTech.trim() || !searchLocation.trim()) {
      alert("Please enter both technology and location")
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch("/api/recruiter/search-talents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technology: searchTech,
          location: searchLocation,
          experience: experienceFilter,
        }),
      })
      const data = await response.json()
      setResults(data.consultants || [])
      setHasSearched(true)
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const copyLinkedIn = (linkedinId: string) => {
    navigator.clipboard.writeText(linkedinId)
    alert("LinkedIn ID copied to clipboard!")
  }

  const exportAsCSV = () => {
    if (results.length === 0) return

    const headers = [
      "Name",
      "LinkedIn ID",
      "Title",
      "Technologies",
      "Location",
      "Experience (Years)",
      "Education",
      "Previous Companies",
      "LinkedIn URL",
    ]
    const rows = results.map((c) => [
      c.name,
      c.linkedinId,
      c.title,
      c.technologies.join("; "),
      c.location,
      c.experience,
      c.education.map((e) => `${e.degree} from ${e.school}`).join("; "),
      c.previousCompanies.join("; "),
      c.linkedinUrl,
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `consultants-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Find Talent Consultants</CardTitle>
          <CardDescription>Search LinkedIn for consultants by technology and location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Technology/Skill</label>
              <Input
                placeholder="e.g., React, Python, AWS"
                value={searchTech}
                onChange={(e) => setSearchTech(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
              <Input
                placeholder="e.g., San Francisco, Remote"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Experience Level</label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground"
              >
                <option value="all">All Levels</option>
                <option value="junior">Junior (0-2 years)</option>
                <option value="mid">Mid-Level (2-5 years)</option>
                <option value="senior">Senior (5+ years)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
              <Search className="w-4 h-4" />
              {isSearching ? "Searching..." : "Search Talent"}
            </Button>
            {results.length > 0 && (
              <Button onClick={exportAsCSV} variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {hasSearched && (
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>{results.length} consultants found</CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No consultants found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((consultant) => (
                  <div
                    key={consultant.id}
                    className="border border-border rounded-lg p-4 hover:bg-card/50 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Left: Basic Info */}
                      <div>
                        <h3 className="font-semibold text-foreground">{consultant.name}</h3>
                        <p className="text-sm text-muted-foreground">{consultant.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{consultant.location}</Badge>
                          <Badge variant="outline">{consultant.experience}y exp</Badge>
                        </div>
                      </div>

                      {/* Middle: Technologies & Education */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">TECHNOLOGIES</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {consultant.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">EDUCATION</p>
                        <div className="text-xs text-muted-foreground">
                          {consultant.education.map((edu, idx) => (
                            <div key={idx}>
                              {edu.degree} - {edu.school}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Experience */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">PREVIOUS COMPANIES</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          {consultant.previousCompanies.map((company, idx) => (
                            <div key={idx}>{company}</div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                          onClick={() => copyLinkedIn(consultant.linkedinId)}
                        >
                          <Copy className="w-3 h-3" />
                          Copy ID
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                          <a href={consultant.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                            View Profile
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
