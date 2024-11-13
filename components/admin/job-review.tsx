import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const jobReviewData = [
  {
    title: 'Follow Horizon Tech on Twitter',
    instruction: 'Follow @HorizonTech',
    date: 'Oct 27, 2024',
    points: '50 points',
    status: 'Pending',
  },
  {
    title: "Subscribe to ByteWorks' Youtube",
    instruction: 'Subscribe @ByteWorks',
    date: 'Oct 26, 2024',
    points: '75 points',
    status: 'Pending',
  },
  {
    title: 'Share Product Link',
    instruction: "Share FinEdge Solutions' link",
    date: 'Oct 25, 2024',
    points: '30 points',
    status: 'Pending',
  },
]

export function JobReview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Job Review</CardTitle>
        <Button variant="ghost" className="text-sm text-blue-500">
          View All
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Instruction</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quick Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobReviewData.map((job) => (
              <TableRow key={job.title}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.instruction}</TableCell>
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.points}</TableCell>
                <TableCell>
                  <span className="text-yellow-500">{job.status}</span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}