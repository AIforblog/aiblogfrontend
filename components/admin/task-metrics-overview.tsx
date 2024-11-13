import { TrendingDown, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TaskMetricsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Metrics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium">
                Number of New Job Listings
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">Total: 150</div>
              <div className="text-xs text-muted-foreground">
                Updated Daily
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium">
                Number of Reported Posts
              </div>
            </div>
            <div  className="mt-2">
              <div className="text-2xl font-bold">Total: 5</div>
              <div className="text-xs text-muted-foreground">
                Reviewed every 24 hours
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}