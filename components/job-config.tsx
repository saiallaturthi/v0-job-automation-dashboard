"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function JobConfig() {
  const [config, setConfig] = useState({
    keywords: "React, TypeScript, Node.js",
    locations: "Remote, San Francisco, New York",
    minSalary: "100000",
    maxSalary: "200000",
    experience: "mid-level",
    jobType: "full-time",
  })

  const handleChange = (field: string, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Job Search Configuration</CardTitle>
          <CardDescription>Customize your job search parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-foreground font-medium">
              Job Keywords
            </Label>
            <Input
              id="keywords"
              value={config.keywords}
              onChange={(e) => handleChange("keywords", e.target.value)}
              placeholder="e.g., React, Python, DevOps"
              className="bg-background border-border text-foreground"
            />
            <p className="text-xs text-muted-foreground">Separate multiple keywords with commas</p>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <Label htmlFor="locations" className="text-foreground font-medium">
              Preferred Locations
            </Label>
            <Input
              id="locations"
              value={config.locations}
              onChange={(e) => handleChange("locations", e.target.value)}
              placeholder="e.g., Remote, New York, San Francisco"
              className="bg-background border-border text-foreground"
            />
            <p className="text-xs text-muted-foreground">Leave empty for all locations</p>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="text-foreground font-medium">
                Min Salary
              </Label>
              <Input
                id="minSalary"
                type="number"
                value={config.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value)}
                placeholder="100000"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="text-foreground font-medium">
                Max Salary
              </Label>
              <Input
                id="maxSalary"
                type="number"
                value={config.maxSalary}
                onChange={(e) => handleChange("maxSalary", e.target.value)}
                placeholder="200000"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Experience Level</Label>
            <div className="grid grid-cols-3 gap-2">
              {["entry-level", "mid-level", "senior"].map((level) => (
                <Button
                  key={level}
                  variant={config.experience === level ? "default" : "outline"}
                  onClick={() => handleChange("experience", level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Job Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {["full-time", "contract"].map((type) => (
                <Button
                  key={type}
                  variant={config.jobType === type ? "default" : "outline"}
                  onClick={() => handleChange("jobType", type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Save Configuration */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button className="flex-1">Save Configuration</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
