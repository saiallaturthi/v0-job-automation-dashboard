interface ProgressTrackerProps {
  isRunning: boolean
}

export function ProgressTracker({ isRunning }: ProgressTrackerProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Session Progress</span>
          <span className="text-sm text-muted-foreground">68/100 applications</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className={`bg-chart-1 h-2 rounded-full transition-all duration-500 ${isRunning ? "w-[68%]" : "w-0"}`} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Applied</span>
          <span className="text-foreground font-medium">68</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Pending</span>
          <span className="text-foreground font-medium">32</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Successful Responses</span>
          <span className="text-chart-1 font-medium">6</span>
        </div>
      </div>

      {isRunning && (
        <div className="mt-4 p-3 bg-chart-1/10 border border-chart-1/30 rounded-lg">
          <p className="text-sm text-chart-1 font-medium">Currently applying to jobs...</p>
          <p className="text-xs text-chart-1/70 mt-1">Next job in 45 seconds</p>
        </div>
      )}
    </div>
  )
}
