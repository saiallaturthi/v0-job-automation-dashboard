"use client"

import { useProgressStream } from "@/hooks/use-progress-stream"
import { AlertCircle } from "lucide-react"

interface EnhancedProgressTrackerProps {
  isRunning: boolean
}

export function EnhancedProgressTracker({ isRunning }: EnhancedProgressTrackerProps) {
  const { progress, isConnected, error } = useProgressStream()

  const applied = progress?.applied ?? 0
  const pending = progress?.pending ?? 0
  const successfulResponses = progress?.successfulResponses ?? 0
  const total = applied + pending

  const progressPercent = total > 0 ? (applied / total) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-chart-1" : error ? "bg-destructive" : "bg-muted"}`} />
        <span className="text-xs font-medium text-muted-foreground">
          {isConnected ? "Live" : error ? "Disconnected" : "Connecting..."}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Session Progress</span>
          <span className="text-sm text-muted-foreground">
            {applied}/{total} applications
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`bg-gradient-to-r from-chart-2 to-chart-1 h-3 rounded-full transition-all duration-500 ${
              isRunning ? `w-[${progressPercent}%]` : "w-0"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Applied</p>
          <p className="text-2xl font-bold text-foreground">{applied}</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-foreground">{pending}</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Responses</p>
          <p className="text-2xl font-bold text-chart-1">{successfulResponses}</p>
        </div>
      </div>

      {/* Live Updates Status */}
      {isRunning && (
        <div className="mt-4 p-3 bg-chart-1/10 border border-chart-1/30 rounded-lg">
          <p className="text-sm text-chart-1 font-medium">Currently applying to jobs...</p>
          <p className="text-xs text-chart-1/70 mt-1">Last updated: {progress?.timestamp?.toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  )
}
