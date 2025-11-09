import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  description: string
  trend: string
  trendUp: boolean
  icon: string
}

export function StatsCard({ title, value, description, trend, trendUp, icon }: StatsCardProps) {
  return (
    <Card className="border border-border hover:bg-muted/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          {title}
          <span className="text-2xl">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className={`text-xs font-medium ${trendUp ? "text-chart-1" : "text-destructive"}`}>{trend}</div>
        </div>
      </CardContent>
    </Card>
  )
}
