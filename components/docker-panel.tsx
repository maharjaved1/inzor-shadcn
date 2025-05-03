"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"

interface DockerPanelProps {
  executeCommand: (command: string) => void
  isDockerRunning: boolean
}

export function DockerPanel({ executeCommand, isDockerRunning }: DockerPanelProps) {
  const [imageTag, setImageTag] = useState("")
  const [containerPort, setContainerPort] = useState("")
  const [hostPort, setHostPort] = useState("")
  const [imageName, setImageName] = useState("")
  const [containerName, setContainerName] = useState("")
  const [serviceName, setServiceName] = useState("")

  if (!isDockerRunning) {
    return (
      <div className="rounded-md border h-full flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Docker is not running</h3>
        <p className="text-center text-muted-foreground mb-4">
          Please start Docker Desktop or the Docker service to use Docker functionality.
        </p>
        <Button onClick={() => executeCommand("docker --version")}>Check Docker Status</Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border h-full p-4">
      <Tabs defaultValue="containers">
        <TabsList className="mb-4">
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="compose">Docker Compose</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-22rem)]">
          <TabsContent value="containers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Container Management</h3>
                <div className="space-y-4">
                  <div>
                    <Button variant="outline" onClick={() => executeCommand("docker ps")} className="mr-2">
                      List Running
                    </Button>
                    <Button variant="outline" onClick={() => executeCommand("docker ps -a")}>
                      List All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="container-name">Container Name/ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="container-name"
                        value={containerName}
                        onChange={(e) => setContainerName(e.target.value)}
                        placeholder="container_name or ID"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker stop ${containerName}`)}
                        disabled={!containerName}
                      >
                        Stop
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker start ${containerName}`)}
                        disabled={!containerName}
                      >
                        Start
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker restart ${containerName}`)}
                        disabled={!containerName}
                      >
                        Restart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker rm ${containerName}`)}
                        disabled={!containerName}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker logs ${containerName}`)}
                        disabled={!containerName}
                      >
                        Logs
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => containerName && executeCommand(`docker exec -it ${containerName} sh`)}
                        disabled={!containerName}
                      >
                        Shell
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Run Container</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-name">Image Name</Label>
                    <Input
                      id="image-name"
                      value={imageName}
                      onChange={(e) => setImageName(e.target.value)}
                      placeholder="e.g., nginx:latest"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="host-port">Host Port</Label>
                      <Input
                        id="host-port"
                        value={hostPort}
                        onChange={(e) => setHostPort(e.target.value)}
                        placeholder="e.g., 8080"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="container-port">Container Port</Label>
                      <Input
                        id="container-port"
                        value={containerPort}
                        onChange={(e) => setContainerPort(e.target.value)}
                        placeholder="e.g., 80"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      if (imageName) {
                        const portMapping = hostPort && containerPort ? `-p ${hostPort}:${containerPort}` : ""
                        executeCommand(`docker run -d ${portMapping} ${imageName}`)
                      }
                    }}
                    disabled={!imageName}
                    className="w-full"
                  >
                    Run Container
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium mb-4">Network & Volume</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => executeCommand("docker network ls")}>
                  List Networks
                </Button>
                <Button variant="outline" onClick={() => executeCommand("docker volume ls")}>
                  List Volumes
                </Button>
                <Button variant="outline" onClick={() => executeCommand("docker network create my-network")}>
                  Create Network
                </Button>
                <Button variant="outline" onClick={() => executeCommand("docker volume create my-volume")}>
                  Create Volume
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="images" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Image Management</h3>
                <div className="space-y-4">
                  <Button variant="outline" onClick={() => executeCommand("docker images")} className="w-full">
                    List Images
                  </Button>
                  <div className="space-y-2">
                    <Label htmlFor="image-id">Image Name/ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image-id"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        placeholder="image_name or ID"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => imageName && executeCommand(`docker rmi ${imageName}`)}
                        disabled={!imageName}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => imageName && executeCommand(`docker pull ${imageName}`)}
                        disabled={!imageName}
                      >
                        Pull
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => imageName && executeCommand(`docker image inspect ${imageName}`)}
                        disabled={!imageName}
                      >
                        Inspect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Build Image</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-tag">Image Tag</Label>
                    <Input
                      id="image-tag"
                      value={imageTag}
                      onChange={(e) => setImageTag(e.target.value)}
                      placeholder="e.g., myapp:latest"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (imageTag) {
                        executeCommand(`docker build -t ${imageTag} .`)
                      }
                    }}
                    disabled={!imageTag}
                    className="w-full"
                  >
                    Build Image
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="compose" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium mb-4">Docker Compose</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => executeCommand("docker-compose up")}>
                    Up
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker-compose up -d")}>
                    Up Detached
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker-compose down")}>
                    Down
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker-compose build")}>
                    Build
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker-compose logs")}>
                    Logs
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker-compose logs -f")}>
                    Follow Logs
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-name">Service Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="service-name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="e.g., web, db"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => serviceName && executeCommand(`docker-compose restart ${serviceName}`)}
                      disabled={!serviceName}
                    >
                      Restart Service
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => serviceName && executeCommand(`docker-compose exec ${serviceName} sh`)}
                      disabled={!serviceName}
                    >
                      Shell
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => serviceName && executeCommand(`docker-compose logs ${serviceName}`)}
                      disabled={!serviceName}
                    >
                      Service Logs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="system" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium mb-4">System Management</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => executeCommand("docker system df")}>
                    Disk Usage
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker system info")}>
                    System Info
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker system prune")}>
                    Prune System
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker container prune")}>
                    Prune Containers
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker image prune")}>
                    Prune Images
                  </Button>
                  <Button variant="outline" onClick={() => executeCommand("docker volume prune")}>
                    Prune Volumes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
