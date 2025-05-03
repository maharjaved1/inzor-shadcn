"use client"

import { useState } from "react"
import { AlertCircle, Copy, GitBranch, GitPullRequest, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Terminal } from "@/components/ui/terminal"

export function GitIntegration() {
  const [repoUrl, setRepoUrl] = useState("")
  const [branch, setBranch] = useState("main")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")
  const [activeTab, setActiveTab] = useState("clone")

  const handleGitAction = async (action: string) => {
    setLoading(true)
    setOutput("")

    // Simulate git command execution
    let command = ""
    let simulatedOutput = ""

    switch (action) {
      case "clone":
        command = `git clone ${repoUrl} -b ${branch}`
        simulatedOutput = `Cloning into '${repoUrl.split("/").pop()?.replace(".git", "")}'...
remote: Enumerating objects: 1325, done.
remote: Counting objects: 100% (1325/1325), done.
remote: Compressing objects: 100% (890/890), done.
remote: Total 1325 (delta 435), reused 1325 (delta 435), pack-reused 0
Receiving objects: 100% (1325/1325), 2.56 MiB | 8.42 MiB/s, done.
Resolving deltas: 100% (435/435), done.`
        break
      case "pull":
        command = `git pull origin ${branch}`
        simulatedOutput = `From ${repoUrl.split("//")[1]}
 * branch            ${branch}     -> FETCH_HEAD
Updating a1b2c3d..e4f5g6h
Fast-forward
 README.md       | 15 +++++++++------
 src/index.js    | 23 +++++++++++++++++++++++
 2 files changed, 32 insertions(+), 6 deletions(-)`
        break
      case "fetch":
        command = `git fetch origin ${branch}`
        simulatedOutput = `From ${repoUrl.split("//")[1]}
 * branch            ${branch}     -> FETCH_HEAD`
        break
      default:
        simulatedOutput = "Unknown command"
    }

    // Simulate typing effect for the output
    let i = 0
    const interval = setInterval(() => {
      if (i < simulatedOutput.length) {
        setOutput((prev) => prev + simulatedOutput.charAt(i))
        i++
      } else {
        clearInterval(interval)
        setLoading(false)
        toast({
          title: "Git operation completed",
          description: `Successfully executed: ${command}`,
        })
      }
    }, 10)
  }

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    toast({
      title: "Copied to clipboard",
      description: "Git command copied to clipboard",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Git Repository Integration
        </CardTitle>
        <CardDescription>Clone, pull, or fetch from Git repositories to deploy your applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clone" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clone">Clone</TabsTrigger>
            <TabsTrigger value="pull">Pull</TabsTrigger>
            <TabsTrigger value="fetch">Fetch</TabsTrigger>
          </TabsList>
          <TabsContent value="clone" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repo.git"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input id="branch" placeholder="main" value={branch} onChange={(e) => setBranch(e.target.value)} />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This will clone the repository to your container's filesystem.</AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="pull" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url-pull">Repository URL</Label>
              <Input
                id="repo-url-pull"
                placeholder="https://github.com/username/repo.git"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch-pull">Branch</Label>
              <Input id="branch-pull" placeholder="main" value={branch} onChange={(e) => setBranch(e.target.value)} />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This will pull the latest changes from the specified branch.</AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="fetch" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url-fetch">Repository URL</Label>
              <Input
                id="repo-url-fetch"
                placeholder="https://github.com/username/repo.git"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch-fetch">Branch</Label>
              <Input id="branch-fetch" placeholder="main" value={branch} onChange={(e) => setBranch(e.target.value)} />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This will fetch the remote branch without merging changes.</AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <Label>Command Preview</Label>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1"
              onClick={() => {
                let command = ""
                switch (activeTab) {
                  case "clone":
                    command = `git clone ${repoUrl} -b ${branch}`
                    break
                  case "pull":
                    command = `git pull origin ${branch}`
                    break
                  case "fetch":
                    command = `git fetch origin ${branch}`
                    break
                }
                copyCommand(command)
              }}
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </Button>
          </div>
          <div className="relative">
            <Textarea
              readOnly
              className="font-mono text-sm h-16 resize-none bg-muted"
              value={
                activeTab === "clone"
                  ? `git clone ${repoUrl} -b ${branch}`
                  : activeTab === "pull"
                    ? `git pull origin ${branch}`
                    : `git fetch origin ${branch}`
              }
            />
          </div>
        </div>

        {output && (
          <div className="mt-4">
            <Label className="mb-2 block">Output</Label>
            <Terminal className="h-48">{output}</Terminal>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2" onClick={() => handleGitAction(activeTab)} disabled={!repoUrl || loading}>
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              {activeTab === "clone" ? (
                <GitBranch className="h-4 w-4" />
              ) : activeTab === "pull" ? (
                <GitPullRequest className="h-4 w-4" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>
                {activeTab === "clone" ? "Clone Repository" : activeTab === "pull" ? "Pull Changes" : "Fetch Updates"}
              </span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
