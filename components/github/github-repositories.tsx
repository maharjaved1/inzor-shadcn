"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, GitFork, GitPullRequest, Star, Eye, Code, GitCommit, Play } from "lucide-react"

const repositories = [
  {
    id: "repo1",
    name: "cloud-platform",
    description: "A complete DevOps cloud platform for developers",
    language: "TypeScript",
    stars: 245,
    forks: 57,
    issues: 12,
    pullRequests: 5,
    lastUpdated: "2 days ago",
    visibility: "public",
    isArchived: false,
  },
  {
    id: "repo2",
    name: "kubernetes-operator",
    description: "Custom Kubernetes operator for managing cloud resources",
    language: "Go",
    stars: 189,
    forks: 34,
    issues: 8,
    pullRequests: 3,
    lastUpdated: "1 week ago",
    visibility: "public",
    isArchived: false,
  },
  {
    id: "repo3",
    name: "database-migration-tool",
    description: "Tool for seamless database migrations",
    language: "Python",
    stars: 76,
    forks: 12,
    issues: 5,
    pullRequests: 2,
    lastUpdated: "3 days ago",
    visibility: "public",
    isArchived: false,
  },
  {
    id: "repo4",
    name: "internal-dashboard",
    description: "Internal admin dashboard for the platform",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    issues: 15,
    pullRequests: 4,
    lastUpdated: "1 day ago",
    visibility: "private",
    isArchived: false,
  },
  {
    id: "repo5",
    name: "legacy-api",
    description: "Legacy API service (deprecated)",
    language: "Java",
    stars: 12,
    forks: 3,
    issues: 0,
    pullRequests: 0,
    lastUpdated: "6 months ago",
    visibility: "public",
    isArchived: true,
  },
]

export function GitHubRepositories() {
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredRepos = repositories.filter((repo) => {
    if (selectedTab === "all") return true
    if (selectedTab === "public") return repo.visibility === "public" && !repo.isArchived
    if (selectedTab === "private") return repo.visibility === "private" && !repo.isArchived
    if (selectedTab === "archived") return repo.isArchived
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
        <CardDescription>Manage your GitHub repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{repo.name}</h3>
                      <Badge variant={repo.visibility === "private" ? "outline" : "secondary"}>{repo.visibility}</Badge>
                      {repo.isArchived && <Badge variant="destructive">archived</Badge>}
                    </div>
                    <p className="text-muted-foreground mt-1">{repo.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <GitBranch className="h-4 w-4 mr-1" />
                    Clone
                  </Button>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <span
                        className={`h-3 w-3 rounded-full bg-${
                          repo.language === "TypeScript"
                            ? "blue-500"
                            : repo.language === "JavaScript"
                              ? "yellow-500"
                              : repo.language === "Python"
                                ? "green-500"
                                : repo.language === "Go"
                                  ? "cyan-500"
                                  : repo.language === "Java"
                                    ? "orange-500"
                                    : "gray-500"
                        }`}
                      ></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitPullRequest className="h-4 w-4" />
                    <span>{repo.pullRequests} pull requests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{repo.issues} issues</span>
                  </div>
                  <div>Updated {repo.lastUpdated}</div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4 mr-1" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitCommit className="h-4 w-4 mr-1" />
                    Commits
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Deploy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
