"use client"

import { useState } from "react"
import { AlertCircle, Check, Filter, MessageSquare, Plus, Search, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface Issue {
  id: string
  title: string
  number: number
  author: {
    name: string
    avatar: string
    username: string
  }
  repository: string
  status: "open" | "closed"
  priority: "low" | "medium" | "high"
  labels: string[]
  assignees: {
    name: string
    avatar: string
    username: string
  }[]
  comments: number
  createdAt: string
  updatedAt: string
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Container creation fails with network error",
    number: 42,
    author: {
      name: "Sarah Chen",
      avatar: "",
      username: "sarahchen",
    },
    repository: "devops-platform",
    status: "open",
    priority: "high",
    labels: ["bug", "networking"],
    assignees: [
      {
        name: "Alex Johnson",
        avatar: "",
        username: "alexj",
      },
    ],
    comments: 8,
    createdAt: "2023-05-10T10:30:00Z",
    updatedAt: "2023-05-11T14:20:00Z",
  },
  {
    id: "2",
    title: "Kubernetes dashboard shows incorrect pod counts",
    number: 43,
    author: {
      name: "Alex Johnson",
      avatar: "",
      username: "alexj",
    },
    repository: "devops-platform",
    status: "open",
    priority: "medium",
    labels: ["bug", "kubernetes", "ui"],
    assignees: [
      {
        name: "Maria Garcia",
        avatar: "",
        username: "mgarcia",
      },
    ],
    comments: 5,
    createdAt: "2023-05-11T09:15:00Z",
    updatedAt: "2023-05-12T11:45:00Z",
  },
  {
    id: "3",
    title: "Add support for PostgreSQL databases",
    number: 40,
    author: {
      name: "Maria Garcia",
      avatar: "",
      username: "mgarcia",
    },
    repository: "devops-platform",
    status: "closed",
    priority: "medium",
    labels: ["enhancement", "database"],
    assignees: [
      {
        name: "David Kim",
        avatar: "",
        username: "dkim",
      },
    ],
    comments: 12,
    createdAt: "2023-05-08T14:20:00Z",
    updatedAt: "2023-05-09T16:30:00Z",
  },
  {
    id: "4",
    title: "Implement dark mode for the dashboard",
    number: 38,
    author: {
      name: "David Kim",
      avatar: "",
      username: "dkim",
    },
    repository: "devops-platform",
    status: "open",
    priority: "low",
    labels: ["enhancement", "ui"],
    assignees: [],
    comments: 3,
    createdAt: "2023-05-07T11:10:00Z",
    updatedAt: "2023-05-08T13:25:00Z",
  },
  {
    id: "5",
    title: "Add metrics for container resource usage",
    number: 44,
    author: {
      name: "James Wilson",
      avatar: "",
      username: "jwilson",
    },
    repository: "devops-platform",
    status: "open",
    priority: "high",
    labels: ["enhancement", "monitoring"],
    assignees: [
      {
        name: "Sarah Chen",
        avatar: "",
        username: "sarahchen",
      },
    ],
    comments: 2,
    createdAt: "2023-05-12T08:45:00Z",
    updatedAt: "2023-05-12T10:15:00Z",
  },
]

export function GitHubIssues() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [activeTab, setActiveTab] = useState("open")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleCloseIssue = (id: string) => {
    setIssues((prevIssues) => prevIssues.map((issue) => (issue.id === id ? { ...issue, status: "closed" } : issue)))
    toast({
      title: "Issue closed",
      description: "The issue has been successfully closed.",
    })
  }

  const handleReopenIssue = (id: string) => {
    setIssues((prevIssues) => prevIssues.map((issue) => (issue.id === id ? { ...issue, status: "open" } : issue)))
    toast({
      title: "Issue reopened",
      description: "The issue has been successfully reopened.",
    })
  }

  const filteredIssues = issues
    .filter((issue) => {
      // Filter by tab
      if (activeTab === "open") return issue.status === "open"
      if (activeTab === "closed") return issue.status === "closed"
      return true
    })
    .filter((issue) => {
      // Filter by search query
      if (!searchQuery) return true
      return (
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.labels.some((label) => label.toLowerCase().includes(searchQuery.toLowerCase())) ||
        issue.number.toString().includes(searchQuery)
      )
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
          <AlertCircle className="h-5 w-5" />
          Issues
        </CardTitle>
        <CardDescription>Track and manage issues across your repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="open" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="open" className="mt-0">
            {renderIssues(filteredIssues, handleCloseIssue, handleReopenIssue, formatDate)}
          </TabsContent>
          <TabsContent value="closed" className="mt-0">
            {renderIssues(filteredIssues, handleCloseIssue, handleReopenIssue, formatDate)}
          </TabsContent>
          <TabsContent value="all" className="mt-0">
            {renderIssues(filteredIssues, handleCloseIssue, handleReopenIssue, formatDate)}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Refresh</Button>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> New Issue
        </Button>
      </CardFooter>
    </Card>
  )
}

function renderIssues(
  issues: Issue[],
  handleCloseIssue: (id: string) => void,
  handleReopenIssue: (id: string) => void,
  formatDate: (date: string) => string,
) {
  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No issues found</h3>
        <p className="text-sm text-muted-foreground mt-1">There are no issues matching the current filter.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div key={issue.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {issue.status === "open" ? (
                  <AlertCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Check className="h-4 w-4 text-purple-500" />
                )}
                <h3 className="font-medium">{issue.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                #{issue.number} opened on {formatDate(issue.createdAt)} by {issue.author.username}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {issue.status === "open" ? (
                <Button size="sm" variant="outline" onClick={() => handleCloseIssue(issue.id)}>
                  <Check className="h-4 w-4 mr-1" /> Close
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => handleReopenIssue(issue.id)}>
                  <AlertCircle className="h-4 w-4 mr-1" /> Reopen
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {issue.labels.map((label) => (
              <Badge key={label} variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {label}
              </Badge>
            ))}
            <Badge
              variant={issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "outline"}
            >
              {issue.priority} priority
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
              <MessageSquare className="h-3 w-3" />
              {issue.comments} comments
            </div>
          </div>
          {issue.assignees.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Assignees:</span>
              <div className="flex -space-x-2">
                {issue.assignees.map((assignee) => (
                  <Avatar key={assignee.username} className="h-6 w-6 border-2 border-background">
                    <AvatarFallback>{assignee.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
