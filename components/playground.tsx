"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Code, Play } from "lucide-react"

interface PlaygroundProps {
  isDockerRunning: boolean
}

export function Playground({ isDockerRunning }: PlaygroundProps) {
  const [activeContainer, setActiveContainer] = useState<string | null>(null)

  const containers = [
    { id: "web", name: "Web Server", image: "nginx:latest", port: 8080, status: "running" },
    { id: "api", name: "API Server", image: "node:16", port: 3000, status: "stopped" },
    { id: "db", name: "Database", image: "postgres:14", port: 5432, status: "running" },
  ]

  if (!isDockerRunning) {
    return (
      <div className="rounded-md border h-full flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Docker is not running</h3>
        <p className="text-center text-muted-foreground mb-4">
          Please start Docker Desktop or the Docker service to use the playground.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border h-full p-4">
      <h3 className="text-lg font-medium mb-4">Docker Playground</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {containers.map((container) => (
          <Card
            key={container.id}
            className={`cursor-pointer ${activeContainer === container.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setActiveContainer(container.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{container.name}</CardTitle>
              <CardDescription>{container.image}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${container.status === "running" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <span className="text-sm capitalize">{container.status}</span>
                </div>
                <span className="text-sm">Port: {container.port}</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" disabled={container.status === "running"}>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Code className="h-4 w-4 mr-1" />
                  Logs
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {activeContainer && (
        <div className="rounded-md border p-4">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Container ID</h4>
                    <p className="text-sm text-muted-foreground">abc123def456</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Created</h4>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Image</h4>
                    <p className="text-sm text-muted-foreground">
                      {containers.find((c) => c.id === activeContainer)?.image}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Port Mapping</h4>
                    <p className="text-sm text-muted-foreground">
                      {containers.find((c) => c.id === activeContainer)?.port}:80
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Networks</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>bridge</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Volumes</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>/data:/var/lib/data</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="logs">
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-64 overflow-auto">
                <p>[2023-05-02 12:34:56] Starting container...</p>
                <p>[2023-05-02 12:34:57] Container started successfully</p>
                <p>[2023-05-02 12:35:01] Listening on port {containers.find((c) => c.id === activeContainer)?.port}</p>
                <p>[2023-05-02 12:36:12] Received request from 192.168.1.5</p>
                <p>[2023-05-02 12:36:12] Request processed successfully</p>
                <p>[2023-05-02 12:40:23] Received request from 192.168.1.10</p>
                <p>[2023-05-02 12:40:24] Request processed successfully</p>
              </div>
            </TabsContent>
            <TabsContent value="config">
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-64 overflow-auto">
                <p># Docker configuration</p>
                <p>version: '3'</p>
                <p>services:</p>
                <p> {activeContainer}:</p>
                <p> image: {containers.find((c) => c.id === activeContainer)?.image}</p>
                <p> ports:</p>
                <p> - "{containers.find((c) => c.id === activeContainer)?.port}:80"</p>
                <p> volumes:</p>
                <p> - ./data:/var/lib/data</p>
                <p> environment:</p>
                <p> - NODE_ENV=production</p>
                <p> restart: always</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
