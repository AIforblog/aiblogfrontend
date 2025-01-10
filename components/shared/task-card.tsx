import type { APIJobType } from "@/types/job";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export default function TaskCard({ job }: { job: APIJobType }) {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <Badge className="capitalize self-end mb-2">{job.status}</Badge>
        <CardTitle className="text-lg">{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{job.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
