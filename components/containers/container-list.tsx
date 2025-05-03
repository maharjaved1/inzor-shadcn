"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Square, RefreshCw, Trash2, Terminal, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ContainerTerminal } from "@/components/containers/container-terminal"

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
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <Tabs defaultValue="containers" className="space-y-4">
      <TabsList>
        <TabsTrigger value="containers">Containers</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="volumes">Volumes</TabsTrigger>
        <TabsTrigger value="networks">Networks</TabsTrigger>
      </TabsList>
      <TabsContent value="containers" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((container) => (
            <Card
              key={container.id}
              className={`cursor-pointer ${selectedContainer === container.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedContainer(container.id)}
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
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowTerminal(true)
                      }}
                    >
                      <Terminal className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
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
                <Button variant="ghost" size="icon" onClick={() => setShowTerminal(false)}>
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
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
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
            <p>Volume management content will appear here</p>
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
            <p>Network management content will appear here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
