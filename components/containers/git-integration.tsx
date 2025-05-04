"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { GitBranch, GitMerge, Loader2 } from "lucide-react"

export function GitIntegration() {
  const [repoUrl, setRepoUrl] = useState("")
  const [branch, setBranch] = useState("main")
  const [isCloning, setIsCloning] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const [isMerging, setIsMerging] = useState(false)

  const handleCloneRepo = () => {
    if (!repoUrl) {
      toast({
        title: "Error",
        description: "Repository URL is required",
        variant: "destructive",
      })
      return
    }

    setIsCloning(true)

    // Simulate cloning repository
    setTimeout(() => {
      setIsCloning(false)
      toast({
        title: "Repository Cloned",
        description: `Successfully cloned repository from ${repoUrl}`,
      })
    }, 2000)
  }

  const handlePullChanges = () => {
    setIsPulling(true)

    // Simulate pulling changes
    setTimeout(() => {
      setIsPulling(false)
      toast({
        title: "Changes Pulled",
        description: `Successfully pulled latest changes from ${branch}`,
      })
    }, 1500)
  }

  const handleMergeBranch = () => {
    setIsMerging(true)

    // Simulate merging branches
    setTimeout(() => {
      setIsMerging(false)
      toast({
        title: "Branches Merged",
        description: `Successfully merged feature branch into ${branch}`,
      })
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="repository" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="repository" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Repository Management</CardTitle>
              <CardDescription>Clone and manage Git repositories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url">Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repository.git"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={branch} onValueChange={setBranch}>
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="master">master</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="feature/new-feature">feature/new-feature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCloneRepo} disabled={isCloning} className="w-full">
                    {isCloning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cloning...
                      </>
                    ) : (
                      <>
                        <GitBranch className="mr-2 h-4 w-4" />
                        Clone Repository
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">Recent Repositories</div>
                  <div className="rounded-md border divide-y">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">cloud-platform</div>
                        <div className="text-sm text-muted-foreground">Last updated: 2 days ago</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={handlePullChanges} disabled={isPulling}>
                        {isPulling ? (
                          <>
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Pulling...
                          </>
                        ) : (
                          "Pull"
                        )}
                      </Button>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">kubernetes-operator</div>
                        <div className="text-sm text-muted-foreground">Last updated: 1 week ago</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Pull
                      </Button>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">database-migration-tool</div>
                        <div className="text-sm text-muted-foreground">Last updated: 3 days ago</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Pull
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branch Management</CardTitle>
              <CardDescription>Manage Git branches and merges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="source-branch">Source Branch</Label>
                    <Select defaultValue="feature/new-feature">
                      <SelectTrigger id="source-branch">
                        <SelectValue placeholder="Select source branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature/new-feature">feature/new-feature</SelectItem>
                        <SelectItem value="feature/bug-fix">feature/bug-fix</SelectItem>
                        <SelectItem value="hotfix/security-patch">hotfix/security-patch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-branch">Target Branch</Label>
                    <Select defaultValue="main">
                      <SelectTrigger id="target-branch">
                        <SelectValue placeholder="Select target branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="staging">staging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleMergeBranch} disabled={isMerging} className="w-full">
                    {isMerging ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Merging...
                      </>
                    ) : (
                      <>
                        <GitMerge className="mr-2 h-4 w-4" />
                        Merge Branches
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">Active Branches</div>
                  <div className="rounded-md border divide-y">
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <div>
                          <div className="font-medium">main</div>
                          <div className="text-sm text-muted-foreground">Default branch</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <div>
                          <div className="font-medium">develop</div>
                          <div className="text-sm text-muted-foreground">Development branch</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">12 hours ago</div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                        <div>
                          <div className="font-medium">feature/new-feature</div>
                          <div className="text-sm text-muted-foreground">New dashboard feature</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commit History</CardTitle>
              <CardDescription>View and manage Git commits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border divide-y">
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Update dashboard UI components</div>
                      <div className="text-sm text-muted-foreground">John Doe • 3 hours ago</div>
                    </div>
                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded">a8c7b9d</div>
                  </div>
                  <div className="mt-2 text-sm">Improved responsive layout and fixed styling issues</div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Fix container creation bug</div>
                      <div className="text-sm text-muted-foreground">Jane Smith • 1 day ago</div>
                    </div>
                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded">b2e4f6c</div>
                  </div>
                  <div className="mt-2 text-sm">Fixed issue with container volume mounting</div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Add Kubernetes integration</div>
                      <div className="text-sm text-muted-foreground">Mike Johnson • 2 days ago</div>
                    </div>
                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded">d5f8g9h</div>
                  </div>
                  <div className="mt-2 text-sm">Implemented Kubernetes cluster management features</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pull-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pull Requests</CardTitle>
              <CardDescription>Manage and review pull requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border divide-y">
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Feature: New Dashboard UI</div>
                      <div className="text-sm text-muted-foreground">PR #42 • Opened by John Doe</div>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 text-xs px-2 py-1 rounded-full">
                      Review Needed
                    </div>
                  </div>
                  <div className="mt-2 text-sm">feature/dashboard-ui → main</div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Fix: Container Volume Mounting</div>
                      <div className="text-sm text-muted-foreground">PR #41 • Opened by Jane Smith</div>
                    </div>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs px-2 py-1 rounded-full">
                      Approved
                    </div>
                  </div>
                  <div className="mt-2 text-sm">fix/volume-mount → main</div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Feature: Kubernetes Integration</div>
                      <div className="text-sm text-muted-foreground">PR #40 • Opened by Mike Johnson</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 text-xs px-2 py-1 rounded-full">
                      Merged
                    </div>
                  </div>
                  <div className="mt-2 text-sm">feature/kubernetes → main</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
