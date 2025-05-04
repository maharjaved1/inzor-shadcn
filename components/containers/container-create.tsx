"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function ContainerCreate() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [containerName, setContainerName] = useState("")
  const [selectedImage, setSelectedImage] = useState("nginx:latest")
  const [exposedPorts, setExposedPorts] = useState("80:80")
  const [environmentVars, setEnvironmentVars] = useState("")
  const [command, setCommand] = useState("")
  const [autoRestart, setAutoRestart] = useState(true)
  const [cpuLimit, setCpuLimit] = useState("1")
  const [memoryLimit, setMemoryLimit] = useState("512")
  const [yamlConfig, setYamlConfig] = useState(
    `version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    restart: always`,
  )

  const handleCreateContainer = () => {
    if (!containerName) {
      toast({
        title: "Error",
        description: "Container name is required",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate container creation
    setTimeout(() => {
      setIsCreating(false)
      toast({
        title: "Container Created",
        description: `Container ${containerName} has been created successfully`,
      })
      router.push("/dashboard/containers")
    }, 2000)
  }

  const handleCancel = () => {
    router.push("/dashboard/containers")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Container</h2>
          <p className="text-muted-foreground">Configure and deploy a new container</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          <TabsTrigger value="yaml">YAML Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Container Details</CardTitle>
              <CardDescription>Configure the basic settings for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="container-name">Container Name</Label>
                  <Input
                    id="container-name"
                    placeholder="e.g., web-server"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Container Image</Label>
                  <Select value={selectedImage} onValueChange={setSelectedImage}>
                    <SelectTrigger id="image">
                      <SelectValue placeholder="Select an image" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nginx:latest">nginx:latest</SelectItem>
                      <SelectItem value="node:16">node:16</SelectItem>
                      <SelectItem value="postgres:14">postgres:14</SelectItem>
                      <SelectItem value="redis:alpine">redis:alpine</SelectItem>
                      <SelectItem value="alpine:latest">alpine:latest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ports">Exposed Ports (host:container)</Label>
                <Input
                  id="ports"
                  placeholder="e.g., 80:80, 443:443"
                  value={exposedPorts}
                  onChange={(e) => setExposedPorts(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="env-vars">Environment Variables (one per line)</Label>
                <Textarea
                  id="env-vars"
                  placeholder="e.g., NODE_ENV=production&#10;DB_HOST=localhost"
                  value={environmentVars}
                  onChange={(e) => setEnvironmentVars(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-restart" checked={autoRestart} onCheckedChange={setAutoRestart} />
                <Label htmlFor="auto-restart">Auto-restart on failure</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
              <CardDescription>Configure advanced settings for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpu-limit">CPU Limit (cores)</Label>
                  <Input
                    id="cpu-limit"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={cpuLimit}
                    onChange={(e) => setCpuLimit(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                  <Input
                    id="memory-limit"
                    type="number"
                    min="32"
                    step="32"
                    value={memoryLimit}
                    onChange={(e) => setMemoryLimit(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="command">Override Command</Label>
                <Input
                  id="command"
                  placeholder="e.g., npm start"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volumes">Volume Mounts (host:container)</Label>
                <Input id="volumes" placeholder="e.g., ./data:/data" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="networks">Networks</Label>
                <Select defaultValue="bridge">
                  <SelectTrigger id="networks">
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridge">bridge</SelectItem>
                    <SelectItem value="host">host</SelectItem>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="custom">custom-network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yaml" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>YAML Configuration</CardTitle>
              <CardDescription>Configure your container using Docker Compose YAML</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono min-h-[300px]"
                value={yamlConfig}
                onChange={(e) => setYamlConfig(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleCreateContainer} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Container"
          )}
        </Button>
      </div>
    </div>
  )
}
