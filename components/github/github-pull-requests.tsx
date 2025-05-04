"use client"

import { useState } from "react"
import { GitPullRequest, Check, X, MessageSquare, GitMerge, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PullRequest {
  id: string
  title: string
  number: number
  author: {
    name: string
    avatar: string
    username: string
  }
  repository: string
  branch: string
  targetBranch: string
  status: "open" | "merged" | "closed"
  checks: "success" | "failure" | "pending"
  comments: number
  createdAt: string
  updatedAt: string
}

const mockPullRequests: PullRequest[] = [
  {
    id: "1",
    title: "Add container management functionality",
    number: 123,
    author: {
      name: "Sarah Chen",
      avatar: "",
      username: "sarahchen",
    },
    repository: "devops-platform",
    branch: "feature/container-management",
    targetBranch: "main",
    status: "open",
    checks: "success",
    comments: 5,
    createdAt: "2023-05-10T10:30:00Z",
    updatedAt: "2023-05-11T14:20:00Z",
  },
  {
    id: "2",
    title: "Fix Kubernetes deployment issues",
    number: 124,
    author: {
      name: "Alex Johnson",
      avatar: "",
      username: "alexj",
    },
    repository: "devops-platform",
    branch: "fix/k8s-deployment",
    targetBranch: "main",
    status: "open",
    checks: "failure",
    comments: 8,
    createdAt: "2023-05-11T09:15:00Z",
    updatedAt: "2023-05-12T11:45:00Z",
  },
  {
    id: "3",
    title: "Update database connection pooling",
    number: 120,
    author: {
      name: "Maria Garcia",
      avatar: "",
      username: "mgarcia",
    },
    repository: "devops-platform",
    branch: "feature/db-pooling",
    targetBranch: "main",
    status: "merged",
    checks: "success",
    comments: 3,
    createdAt: "2023-05-08T14:20:00Z",
    updatedAt: "2023-05-09T16:30:00Z",
  },
  {
    id: "4",
    title: "Implement CI/CD pipeline improvements",
    number: 118,
    author: {
      name: "David Kim",
      avatar: "",
      username: "dkim",
    },
    repository: "devops-platform",
    branch: "feature/cicd-improvements",
    targetBranch: "main",
    status: "closed",
    checks: "failure",
    comments: 12,
    createdAt: "2023-05-07T11:10:00Z",
    updatedAt: "2023-05-08T13:25:00Z",
  },
  {
    id: "5",
    title: "Add monitoring dashboard",
    number: 125,
    author: {
      name: "James Wilson",
      avatar: "",
      username: "jwilson",
    },
    repository: "devops-platform",
    branch: "feature/monitoring",
    targetBranch: "main",
    status: "open",
    checks: "pending",
    comments: 2,
    createdAt: "2023-05-12T08:45:00Z",
    updatedAt: "2023-05-12T10:15:00Z",
  },
]

export function GitHubPullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>(mockPullRequests)
  const [activeTab, setActiveTab] = useState("open")
  const { toast } = useToast()

  const handleMergePR = (id: string) => {
    setPullRequests((prevPRs) => prevPRs.map((pr) => (pr.id === id ? { ...pr, status: "merged" } : pr)))
    toast({
      title: "Pull request merged",
      description: "The pull request has been successfully merged.",
    })
  }

  const handleClosePR = (id: string) => {
    setPullRequests((prevPRs) => prevPRs.map((pr) => (pr.id === id ? { ...pr, status: "closed" } : pr)))
    toast({
      title: "Pull request closed",
      description: "The pull request has been closed.",
    })
  }

  const filteredPRs = pullRequests.filter((pr) => {
    if (activeTab === "open") return pr.status === "open"
    if (activeTab === "merged") return pr.status === "merged"
    if (activeTab === "closed") return pr.status === "closed"
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <GitPullRequest className="h-5 w-5" />
          Pull Requests
        </CardTitle>
        <CardDescription>View and manage pull requests across your repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="merged">Merged</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="open" className="mt-0">
            {renderPullRequests(filteredPRs, handleMergePR, handleClosePR, formatDate)}
          </TabsContent>
          <TabsContent value="merged" className="mt-0">
            {renderPullRequests(filteredPRs, handleMergePR, handleClosePR, formatDate)}
          </TabsContent>
          <TabsContent value="closed" className="mt-0">
            {renderPullRequests(filteredPRs, handleMergePR, handleClosePR, formatDate)}
          </TabsContent>
          <TabsContent value="all" className="mt-0">
            {renderPullRequests(filteredPRs, handleMergePR, handleClosePR, formatDate)}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Refresh</Button>
        <Button>Create Pull Request</Button>
      </CardFooter>
    </Card>
  )
}

function renderPullRequests(
  pullRequests: PullRequest[],
  handleMergePR: (id: string) => void,
  handleClosePR: (id: string) => void,
  formatDate: (date: string) => string,
) {
  if (pullRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <GitPullRequest className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No pull requests found</h3>
        <p className="text-sm text-muted-foreground mt-1">There are no pull requests matching the current filter.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pullRequests.map((pr) => (
        <div key={pr.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {pr.status === "open" && <GitPullRequest className="h-4 w-4 text-green-500" />}
                {pr.status === "merged" && <GitMerge className="h-4 w-4 text-purple-500" />}
                {pr.status === "closed" && <X className="h-4 w-4 text-red-500" />}
                <h3 className="font-medium">{pr.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                #{pr.number} opened on {formatDate(pr.createdAt)} by {pr.author.username}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pr.status === "open" && (
                <>
                  <Button size="sm" variant="outline" onClick={() => handleMergePR(pr.id)}>
                    <GitMerge className="h-4 w-4 mr-1" /> Merge
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleClosePR(pr.id)}>
                    <X className="h-4 w-4 mr-1" /> Close
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Badge
                variant={pr.checks === "success" ? "default" : pr.checks === "failure" ? "destructive" : "outline"}
              >
                {pr.checks === "success" && <Check className="h-3 w-3 mr-1" />}
                {pr.checks === "failure" && <AlertCircle className="h-3 w-3 mr-1" />}
                {pr.checks === "pending" && <Clock className="h-3 w-3 mr-1" />}
                {pr.checks === "success"
                  ? "Checks passing"
                  : pr.checks === "failure"
                    ? "Checks failing"
                    : "Checks pending"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              {pr.comments} comments
            </div>
            <div className="text-sm text-muted-foreground">
              {pr.branch} → {pr.targetBranch}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
