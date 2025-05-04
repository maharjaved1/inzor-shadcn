"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Play, Square, RefreshCw, Trash2, Loader2 } from "lucide-react"
import { ContainerTerminal } from "@/components/containers/container-terminal"
import { YamlEditor } from "@/components/containers/yaml-editor"
import { GitIntegration } from "@/components/containers/git-integration"

// Mock container data
const containerData = {
  id: "c1",
  name: "web-server",
  image: "nginx:latest",
  status: "running",
  created: "2 days ago",
  ports: "80:80",
  cpu: 12,
  memory: 25,
  network: "bridge",
  volumes: ["/var/www/html:/usr/share/nginx/html"],
  env: ["NGINX_HOST=example.com", "NGINX_PORT=80"],
  command: "nginx -g 'daemon off;'",
  logs: [
    "[2023-05-01 12:30:45] Starting nginx...",
    "[2023-05-01 12:30:46] nginx: the configuration file /etc/nginx/nginx.conf syntax is ok",
    "[2023-05-01 12:30:46] nginx: configuration file /etc/nginx/nginx.conf test is successful",
    '[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: using the "epoll" event method',
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: nginx/1.23.4",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: OS: Linux 5.15.0-1033-aws",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: start worker processes",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: start worker process 29",
    "[2023-05-01 12:30:47] 2023/05/01 12:30:47 [notice] 1#1: start worker process 30",
  ],
}

export function ContainerDetail({ id }: { id: string }) {
  const router = useRouter()
  const [container, setContainer] = useState(containerData)
  const [isLoading, setIsLoading] = useState(true)
  const [isActionInProgress, setIsActionInProgress] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)

  useEffect(() => {
    // Simulate loading container data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  const handleStartContainer = () => {
    setIsActionInProgress(true)

    // Simulate starting container
    setTimeout(() => {
      setIsActionInProgress(false)
      setContainer({ ...container, status: "running" })
      toast({
        title: "Container Started",
        description: `Container ${container.name} has been started`,
      })
    }, 2000)
  }

  const handleStopContainer = () => {
    setIsActionInProgress(true)

    // Simulate stopping container
    setTimeout(() => {
      setIsActionInProgress(false)
      setContainer({ ...container, status: "stopped" })
      toast({
        title: "Container Stopped",
        description: `Container ${container.name} has been stopped`,
      })
    }, 2000)
  }

  const handleDeleteContainer = () => {
    setIsActionInProgress(true)

    // Simulate deleting container
    setTimeout(() => {
      setIsActionInProgress(false)
      toast({
        title: "Container Deleted",
        description: `Container ${container.name} has been deleted`,
      })
      router.push("/dashboard/containers")
    }, 2000)
  }

  const handleRefreshContainer = () => {
    setIsLoading(true)

    // Simulate refreshing container data
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Container Refreshed",
        description: "Container information has been updated",
      })
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading container details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/containers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{container.name}</h1>
            <p className="text-muted-foreground">{container.image}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshContainer}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          {container.status === "running" ? (
            <Button variant="outline" size="sm" onClick={handleStopContainer} disabled={isActionInProgress}>
              {isActionInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Stopping...
                </>
              ) : (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </>
              )}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleStartContainer} disabled={isActionInProgress}>
              {isActionInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
          )}
          <Button variant="destructive" size="sm" onClick={handleDeleteContainer} disabled={isActionInProgress}>
            {isActionInProgress ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge variant={container.status === "running" ? "default" : "secondary"} className="capitalize">
                {container.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{container.cpu}%</div>
              <Progress value={container.cpu} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{container.memory}%</div>
              <Progress value={container.memory} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{container.network}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
          <TabsTrigger value="git">Git</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Container Details</CardTitle>
              <CardDescription>Basic information about this container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Configuration</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-muted-foreground">Image:</div>
                      <div className="col-span-2 font-mono">{container.image}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-muted-foreground">Created:</div>
                      <div className="col-span-2">{container.created}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-muted-foreground">Ports:</div>
                      <div className="col-span-2 font-mono">{container.ports}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-muted-foreground">Command:</div>
                      <div className="col-span-2 font-mono break-all">{container.command}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Resources</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Volumes</div>
                      <div className="rounded-md bg-muted p-2">
                        {container.volumes.map((volume, index) => (
                          <div key={index} className="text-sm font-mono">
                            {volume}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Environment Variables</div>
                      <div className="rounded-md bg-muted p-2">
                        {container.env.map((env, index) => (
                          <div key={index} className="text-sm font-mono">
                            {env}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Container Logs</CardTitle>
              <CardDescription>View the logs for this container</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-[400px] overflow-auto">
                {container.logs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Logs Refreshed" })}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="terminal" className="space-y-4">
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle>Container Terminal</CardTitle>
              <CardDescription>Interactive terminal for this container</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ContainerTerminal />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yaml" className="space-y-4">
          <YamlEditor />
        </TabsContent>

        <TabsContent value="git" className="space-y-4">
          <GitIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
