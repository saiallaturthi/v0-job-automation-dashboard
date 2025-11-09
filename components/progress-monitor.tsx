"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedProgressTracker } from "./enhanced-progress-tracker"

interface ProgressMonitorProps {
  isRunning: boolean
}

export function ProgressMonitor({ isRunning }: ProgressMonitorProps) {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Real-time Progress</CardTitle>
        <CardDescription>Live automation session tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedProgressTracker isRunning={isRunning} />
      </CardContent>
    </Card>
  )
}
