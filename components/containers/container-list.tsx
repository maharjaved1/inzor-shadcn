"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Square, RefreshCw, Trash2, Terminal, ExternalLink, Plus, Loader2, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ContainerTerminal } from "@/components/containers/container-terminal"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const containers = [
  {
    id: "c1",
    name: "web-server",
    image: "nginx:latest",
    status: "running",
    created: "2 days ago",
    ports: "80:80",
    cpu: 12,
    memory: 25,
  },
  {
    id: "c2",
    name: "api-service",
    image: "node:16",
    status: "running",
    created: "1 day ago",
    ports: "3000:3000",
    cpu: 18,
    memory: 40,
  },
  {
    id: "c3",
    name: "database",
    image: "postgres:14",
    status: "running",
    created: "3 days ago",
    ports: "5432:5432",
    cpu: 22,
    memory: 35,
  },
  {
    id: "c4",
    name: "cache",
    image: "redis:alpine",
    status: "stopped",
    created: "5 days ago",
    ports: "6379:6379",
    cpu: 0,
    memory: 0,
  },
  {
    id: "c5",
    name: "test-service",
    image: "alpine:latest",
    status: "stopped",
    created: "1 week ago",
    ports: "",
    cpu: 0,
    memory: 0,
  },
]

const images = [
  {
    id: "i1",
    name: "nginx",
    tag: "latest",
    size: "142MB",
    created: "2 days ago",
  },
  {
    id: "i2",
    name: "node",
    tag: "16",
    size: "852MB",
    created: "1 week ago",
  },
  {
    id: "i3",
    name: "postgres",
    tag: "14",
    size: "374MB",
    created: "3 days ago",
  },
  {
    id: "i4",
    name: "redis",
    tag: "alpine",
    size: "32MB",
    created: "5 days ago",
  },
  {
    id: "i5",
    name: "alpine",
    tag: "latest",
    size: "5MB",
    created: "1 week ago",
  },
]

export function ContainerList() {
  const router = useRouter()
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isActionInProgress, setIsActionInProgress] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleStartContainer = (id: string, name: string) => {
    setIsActionInProgress(id)

    // Simulate starting container
    setTimeout(() => {
      setIsActionInProgress(null)

      // Update container status in a real app
      // For now, just show a success message
      setSuccessMessage(`Container "${name}" started successfully`)
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Container Started",
        description: `Container "${name}" has been started`,
      })
    }, 2000)
  }

  const handleStopContainer = (id: string, name: string) => {
    setIsActionInProgress(id)

    // Simulate stopping container
    setTimeout(() => {
      setIsActionInProgress(null)

      // Update container status in a real app
      // For now, just show a success message
      setSuccessMessage(`Container "${name}" stopped successfully`)
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Container Stopped",
        description: `Container "${name}" has been stopped`,
      })
    }, 2000)
  }

  const handleDeleteContainer = (id: string, name: string) => {
    setIsActionInProgress(id)

    // Simulate deleting container
    setTimeout(() => {
      setIsActionInProgress(null)

      // Remove container from list in a real app
      // For now, just show a success message
      setSuccessMessage(`Container "${name}" deleted successfully`)
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Container Deleted",
        description: `Container "${name}" has been deleted`,
      })
    }, 2000)
  }

  const handleRefreshContainer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRefreshing(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Container information has been updated",
      })
    }, 1500)
  }

  const handleOpenTerminal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedContainer(id)
    setShowTerminal(true)
  }

  const handleCloseTerminal = () => {
    setShowTerminal(false)
  }

  const handleCreateContainer = () => {
    router.push("/dashboard/containers/create")
  }

  const handleContainerClick = (id: string) => {
    router.push(`/dashboard/containers/${id}`)
  }

  const handleRunImage = (id: string, name: string, tag: string) => {
    setIsActionInProgress(id)

    // Simulate running image
    setTimeout(() => {
      setIsActionInProgress(null)

      // In a real app, this would create a new container
      // For now, just show a success message
      setSuccessMessage(`Image "${name}:${tag}" is now running as a new container`)
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Container Created",
        description: `A new container from image "${name}:${tag}" is now running`,
      })
    }, 2000)
  }

  return (
    <Tabs defaultValue="containers" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="volumes">Volumes</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
        </TabsList>

        <Button onClick={handleCreateContainer}>
          <Plus className="h-4 w-4 mr-1" />
          Create Container
        </Button>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400">
          <Check className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="containers" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((container) => (
            <Card
              key={container.id}
              className={`cursor-pointer ${selectedContainer === container.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleContainerClick(container.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{container.name}</CardTitle>
                    <CardDescription>{container.image}</CardDescription>
                  </div>
                  <Badge variant={container.status === "running" ? "default" : "secondary"}>{container.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{container.created}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ports:</span>
                    <span>{container.ports || "None"}</span>
                  </div>
                  {container.status === "running" && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU:</span>
                          <span>{container.cpu}%</span>
                        </div>
                        <Progress value={container.cpu} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Memory:</span>
                          <span>{container.memory}%</span>
                        </div>
                        <Progress value={container.memory} className="h-1" />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between w-full">
                  {container.status === "running" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStopContainer(container.id, container.name)
                      }}
                      disabled={isActionInProgress === container.id}
                    >
                      {isActionInProgress === container.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Stopping...
                        </>
                      ) : (
                        <>
                          <Square className="h-4 w-4 mr-1" />
                          Stop
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartContainer(container.id, container.name)
                      }}
                      disabled={isActionInProgress === container.id}
                    >
                      {isActionInProgress === container.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleRefreshContainer(container.id, e)}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleOpenTerminal(container.id, e)}
                    >
                      <Terminal className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteContainer(container.id, container.name)
                      }}
                      disabled={isActionInProgress === container.id}
                    >
                      {isActionInProgress === container.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showTerminal && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Container Terminal</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleCloseTerminal}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {containers.find((c) => c.id === selectedContainer)?.name || "Select a container"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContainerTerminal />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="images" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card key={image.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {image.name}:{image.tag}
                </CardTitle>
                <CardDescription>Image ID: {image.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{image.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{image.created}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRunImage(image.id, image.name, image.tag)}
                    disabled={isActionInProgress === image.id}
                  >
                    {isActionInProgress === image.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </>
                    )}
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleRefreshContainer(image.id, e)}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteContainer(image.id, `${image.name}:${image.tag}`)}
                      disabled={isActionInProgress === image.id}
                    >
                      {isActionInProgress === image.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="volumes" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Volumes</CardTitle>
            <CardDescription>Manage Docker volumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[200px] border rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No volumes found</p>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Volume
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="networks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Networks</CardTitle>
            <CardDescription>Manage Docker networks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[200px] border rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No custom networks found</p>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Network
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
