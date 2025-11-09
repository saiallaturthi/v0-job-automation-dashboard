"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AutomationControlsProps {
  isRunning: boolean
  setIsRunning: (value: boolean) => void
}

export function AutomationControls({ isRunning, setIsRunning }: AutomationControlsProps) {
  const [speed, setSpeed] = useState("normal")

  return (
    <div className="space-y-6">
      {/* Main Control Card */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Automation Controls</CardTitle>
          <CardDescription>Manage your job automation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Current Status</p>
              <p className="text-sm text-muted-foreground">
                Automation is currently {isRunning ? "running" : "stopped"}
              </p>
            </div>
            <Badge variant={isRunning ? "default" : "secondary"}>{isRunning ? "Running" : "Stopped"}</Badge>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <p className="font-medium text-foreground">Actions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button size="lg" onClick={() => setIsRunning(true)} disabled={isRunning} className="w-full">
                Start Automation
              </Button>
              <Button
                size="lg"
                variant="destructive"
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
                className="w-full"
              >
                Stop Automation
              </Button>
            </div>
          </div>

          {/* Speed Settings */}
          <div className="space-y-3 border-t border-border pt-6">
            <p className="font-medium text-foreground">Execution Speed</p>
            <div className="grid grid-cols-3 gap-2">
              {["slow", "normal", "fast"].map((mode) => (
                <Button
                  key={mode}
                  variant={speed === mode ? "default" : "outline"}
                  onClick={() => setSpeed(mode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {speed === "slow" && "Slower execution with more time between actions (safer)"}
              {speed === "normal" && "Balanced speed and reliability"}
              {speed === "fast" && "Faster execution but may encounter rate limits"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Card */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Session Monitoring</CardTitle>
          <CardDescription>Current automation session details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Applications Applied</span>
              <span className="text-lg font-semibold text-foreground">37</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="text-lg font-semibold text-foreground">92%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Time Remaining</span>
              <span className="text-lg font-semibold text-foreground">2h 45m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Session Started</span>
              <span className="text-lg font-semibold text-foreground">3h ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
