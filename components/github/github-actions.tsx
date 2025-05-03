"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react"

const workflows = [
  {
    id: "wf1",
    name: "CI/CD Pipeline",
    repository: "cloud-platform",
    branch: "main",
    status: "success",
    duration: "3m 42s",
    triggeredBy: "John Doe",
    triggeredAt: "2 hours ago",
  },
  {
    id: "wf2",
    name: "Integration Tests",
    repository: "cloud-platform",
    branch: "feature/new-dashboard",
    status: "running",
    duration: "1m 15s",
    triggeredBy: "Jane Smith",
    triggeredAt: "15 minutes ago",
  },
  {
    id: "wf3",
    name: "Build Docker Image",
    repository: "kubernetes-operator",
    branch: "main",
    status: "failed",
    duration: "2m 10s",
    triggeredBy: "Mike Johnson",
    triggeredAt: "1 day ago",
  },
  {
    id: "wf4",
    name: "Security Scan",
    repository: "database-migration-tool",
    branch: "main",
    status: "success",
    duration: "5m 23s",
    triggeredBy: "Sarah Williams",
    triggeredAt: "3 days ago",
  },
  {
    id: "wf5",
    name: "Deploy to Production",
    repository: "cloud-platform",
    branch: "main",
    status: "waiting",
    duration: "-",
    triggeredBy: "Automated",
    triggeredAt: "Waiting for approval",
  },
]

export function GitHubActions() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>GitHub Actions</CardTitle>
            <CardDescription>Recent workflow runs</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-3 text-sm font-medium border-b">
              <div>Workflow</div>
              <div>Repository</div>
              <div>Branch</div>
              <div>Status</div>
              <div>Duration</div>
              <div>Triggered By</div>
              <div className="text-right">Actions</div>
            </div>
            {workflows.map((workflow) => (
              <div key={workflow.id} className="grid grid-cols-7 p-3 text-sm border-b last:border-0">
                <div className="font-medium">{workflow.name}</div>
                <div>{workflow.repository}</div>
                <div>{workflow.branch}</div>
                <div>
                  <Badge
                    variant={
                      workflow.status === "success"
                        ? "default"
                        : workflow.status === "running"
                          ? "secondary"
                          : workflow.status === "waiting"
                            ? "outline"
                            : "destructive"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {workflow.status === "success" && <CheckCircle className="h-3 w-3" />}
                    {workflow.status === "running" && <RefreshCw className="h-3 w-3 animate-spin" />}
                    {workflow.status === "failed" && <XCircle className="h-3 w-3" />}
                    {workflow.status === "waiting" && <Clock className="h-3 w-3" />}
                    {workflow.status}
                  </Badge>
                </div>
                <div>{workflow.duration}</div>
                <div>{workflow.triggeredBy}</div>
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Play className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
