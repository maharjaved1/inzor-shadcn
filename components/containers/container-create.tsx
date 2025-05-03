"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash2,
  Play,
  Save,
  Wand2,
  MessageSquare,
  Code,
  FileText,
  ArrowRight,
  Check,
  X,
  AlertCircle,
} from "lucide-react"

export function ContainerCreate() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [containerName, setContainerName] = useState("")
  const [imageName, setImageName] = useState("")
  const [imageTag, setImageTag] = useState("latest")
  const [ports, setPorts] = useState<{ host: string; container: string }[]>([{ host: "", container: "" }])
  const [volumes, setVolumes] = useState<{ host: string; container: string }[]>([{ host: "", container: "" }])
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])
  const [cmd, setCmd] = useState("")
  const [restart, setRestart] = useState("no")
  const [networkMode, setNetworkMode] = useState("bridge")
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [aiCode, setAiCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [yamlContent, setYamlContent] = useState("")
  const [showPermissionRequest, setShowPermissionRequest] = useState(false)
  const [permissionCommand, setPermissionCommand] = useState("")

  const handleAddPort = () => {
    setPorts([...ports, { host: "", container: "" }])
  }

  const handleRemovePort = (index: number) => {
    const newPorts = [...ports]
    newPorts.splice(index, 1)
    setPorts(newPorts)
  }

  const handlePortChange = (index: number, field: "host" | "container", value: string) => {
    const newPorts = [...ports]
    newPorts[index][field] = value
    setPorts(newPorts)
  }

  const handleAddVolume = () => {
    setVolumes([...volumes, { host: "", container: "" }])
  }

  const handleRemoveVolume = (index: number) => {
    const newVolumes = [...volumes]
    newVolumes.splice(index, 1)
    setVolumes(newVolumes)
  }

  const handleVolumeChange = (index: number, field: "host" | "container", value: string) => {
    const newVolumes = [...volumes]
    newVolumes[index][field] = value
    setVolumes(newVolumes)
  }

  const handleAddEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }])
  }

  const handleRemoveEnvVar = (index: number) => {
    const newEnvVars = [...envVars]
    newEnvVars.splice(index, 1)
    setEnvVars(newEnvVars)
  }

  const handleEnvVarChange = (index: number, field: "key" | "value", value: string) => {
    const newEnvVars = [...envVars]
    newEnvVars[index][field] = value
    setEnvVars(newEnvVars)
  }

  const handleGenerateYaml = () => {
    // Generate YAML based on form inputs
    const portMappings = ports
      .filter((p) => p.host && p.container)
      .map((p) => `      - "${p.host}:${p.container}"`)
      .join("\n")

    const volumeMappings = volumes
      .filter((v) => v.host && v.container)
      .map((v) => `      - ${v.host}:${v.container}`)
      .join("\n")

    const environmentVars = envVars
      .filter((e) => e.key)
      .map((e) => `      - ${e.key}=${e.value}`)
      .join("\n")

    const yaml = `version: '3'
services:
  ${containerName || "my-container"}:
    image: ${imageName || "nginx"}:${imageTag || "latest"}
    container_name: ${containerName || "my-container"}
${portMappings ? `    ports:\n${portMappings}` : ""}
${volumeMappings ? `    volumes:\n${volumeMappings}` : ""}
${environmentVars ? `    environment:\n${environmentVars}` : ""}
${cmd ? `    command: ${cmd}` : ""}
    restart: ${restart}
    network_mode: ${networkMode}
`
    setYamlContent(yaml)
    setActiveTab("yaml")
  }

  const handleAiAssist = () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    setAiResponse("")
    setAiCode("")

    // Simulate AI response
    setTimeout(() => {
      const response = `I'll help you create a container configuration based on your requirements. Here's what I recommend:

For a ${aiPrompt.includes("web") ? "web application" : "service"} container, you should use the following configuration:

1. Use the official ${aiPrompt.includes("node") ? "Node.js" : aiPrompt.includes("python") ? "Python" : "nginx"} image
2. Map port ${aiPrompt.includes("node") ? "3000" : aiPrompt.includes("python") ? "5000" : "80"} to the host
3. Set up appropriate environment variables
4. Configure volume mounts for persistent data

I've generated the configuration for you in the YAML tab.`

      const code = aiPrompt.includes("node")
        ? `version: '3'
services:
  web-app:
    image: node:16
    container_name: web-app
    ports:
      - "3000:3000"
    volumes:
      - ./app:/app
      - /app/node_modules
    environment:
      - NODE_ENV=production
      - PORT=3000
    working_dir: /app
    command: npm start
    restart: unless-stopped`
        : aiPrompt.includes("python")
          ? `version: '3'
services:
  flask-app:
    image: python:3.9
    container_name: flask-app
    ports:
      - "5000:5000"
    volumes:
      - ./app:/app
    environment:
      - FLASK_ENV=production
      - FLASK_APP=app.py
    working_dir: /app
    command: flask run --host=0.0.0.0
    restart: unless-stopped`
          : `version: '3'
services:
  web-server:
    image: nginx:latest
    container_name: web-server
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: unless-stopped`

      setAiResponse(response)
      setAiCode(code)
      setYamlContent(code)
      setIsGenerating(false)

      // Simulate permission request
      if (aiPrompt.toLowerCase().includes("sudo") || aiPrompt.toLowerCase().includes("root")) {
        setShowPermissionRequest(true)
        setPermissionCommand("docker run --privileged")
      }
    }, 2000)
  }

  const handleCreateContainer = () => {
    // Simulate container creation
    setTimeout(() => {
      router.push("/dashboard/containers")
    }, 1500)
  }

  const handleApplyAiCode = () => {
    setYamlContent(aiCode)
    setActiveTab("yaml")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Container</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateYaml}>
            <FileText className="h-4 w-4 mr-1" />
            Generate YAML
          </Button>
          <Button onClick={handleCreateContainer}>
            <Play className="h-4 w-4 mr-1" />
            Create & Run
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="ai">AI Assist</TabsTrigger>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>Configure the basic settings for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="container-name">Container Name</Label>
                  <Input
                    id="container-name"
                    placeholder="e.g., my-web-server"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restart-policy">Restart Policy</Label>
                  <Select value={restart} onValueChange={setRestart}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select restart policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="always">Always</SelectItem>
                      <SelectItem value="on-failure">On Failure</SelectItem>
                      <SelectItem value="unless-stopped">Unless Stopped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-name">Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-name"
                    placeholder="e.g., nginx"
                    className="flex-1"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                  />
                  <Input
                    id="image-tag"
                    placeholder="latest"
                    className="w-1/4"
                    value={imageTag}
                    onChange={(e) => setImageTag(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="command">Command</Label>
                <Input
                  id="command"
                  placeholder="e.g., nginx -g 'daemon off;'"
                  value={cmd}
                  onChange={(e) => setCmd(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Configuration</CardTitle>
              <CardDescription>Configure network settings for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="network-mode">Network Mode</Label>
                <Select value={networkMode} onValueChange={setNetworkMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select network mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridge">Bridge</SelectItem>
                    <SelectItem value="host">Host</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="custom">Custom Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Port Mappings</Label>
                  <Button variant="outline" size="sm" onClick={handleAddPort}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Port
                  </Button>
                </div>
                <div className="space-y-2">
                  {ports.map((port, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Host Port"
                        value={port.host}
                        onChange={(e) => handlePortChange(index, "host", e.target.value)}
                        className="flex-1"
                      />
                      <span>:</span>
                      <Input
                        placeholder="Container Port"
                        value={port.container}
                        onChange={(e) => handlePortChange(index, "container", e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleRemovePort(index)} className="h-10 w-10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Configuration</CardTitle>
              <CardDescription>Configure volumes and storage for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Volume Mappings</Label>
                  <Button variant="outline" size="sm" onClick={handleAddVolume}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Volume
                  </Button>
                </div>
                <div className="space-y-2">
                  {volumes.map((volume, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Host Path"
                        value={volume.host}
                        onChange={(e) => handleVolumeChange(index, "host", e.target.value)}
                        className="flex-1"
                      />
                      <span>:</span>
                      <Input
                        placeholder="Container Path"
                        value={volume.container}
                        onChange={(e) => handleVolumeChange(index, "container", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveVolume(index)}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Configure environment variables for your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Environment Variables</Label>
                  <Button variant="outline" size="sm" onClick={handleAddEnvVar}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variable
                  </Button>
                </div>
                <div className="space-y-2">
                  {envVars.map((envVar, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Key"
                        value={envVar.key}
                        onChange={(e) => handleEnvVarChange(index, "key", e.target.value)}
                        className="flex-1"
                      />
                      <span>=</span>
                      <Input
                        placeholder="Value"
                        value={envVar.value}
                        onChange={(e) => handleEnvVarChange(index, "value", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEnvVar(index)}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="privileged">Privileged Mode</Label>
                  <Switch id="privileged" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Gives the container full access to the host. Use with caution.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-remove">Auto Remove</Label>
                  <Switch id="auto-remove" />
                </div>
                <p className="text-sm text-muted-foreground">Automatically remove the container when it exits.</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="health-check">Health Check</Label>
                <Input id="health-check" placeholder="e.g., curl -f http://localhost/ || exit 1" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="interval" className="text-xs">
                      Interval
                    </Label>
                    <Input id="interval" placeholder="30s" className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="timeout" className="text-xs">
                      Timeout
                    </Label>
                    <Input id="timeout" placeholder="10s" className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="retries" className="text-xs">
                      Retries
                    </Label>
                    <Input id="retries" placeholder="3" className="h-8" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Let AI help you configure your container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Describe what you need</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="e.g., I need a Node.js web application container with MongoDB"
                  className="min-h-[100px]"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button className="w-full" onClick={handleAiAssist} disabled={isGenerating || !aiPrompt.trim()}>
                  {isGenerating ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Configuration
                    </>
                  )}
                </Button>
              </div>

              {aiResponse && (
                <div className="space-y-4 mt-4">
                  <div className="border rounded-md p-4 bg-muted/30">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-medium">AI Assistant</h3>
                        <p className="text-sm">{aiResponse}</p>
                      </div>
                    </div>
                  </div>

                  {aiCode && (
                    <div className="border rounded-md p-4">
                      <div className="flex items-start gap-2">
                        <Code className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-2 w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Generated Configuration</h3>
                            <Button variant="outline" size="sm" onClick={handleApplyAiCode}>
                              <ArrowRight className="h-4 w-4 mr-1" />
                              Apply
                            </Button>
                          </div>
                          <pre className="text-sm bg-muted p-2 rounded-md overflow-x-auto">{aiCode}</pre>
                        </div>
                      </div>
                    </div>
                  )}

                  {showPermissionRequest && (
                    <div className="border border-destructive rounded-md p-4 bg-destructive/10">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="space-y-2 w-full">
                          <h3 className="font-medium text-destructive">Permission Required</h3>
                          <p className="text-sm">
                            The AI is requesting to run a privileged command that requires admin approval:
                          </p>
                          <pre className="text-sm bg-muted p-2 rounded-md overflow-x-auto">{permissionCommand}</pre>
                          <div className="flex gap-2 mt-2">
                            <Button variant="destructive" size="sm">
                              <X className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                            <Button variant="outline" size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yaml" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>YAML Configuration</CardTitle>
                <CardDescription>View and edit the YAML configuration</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" onClick={handleCreateContainer}>
                  <Play className="h-4 w-4 mr-1" />
                  Create & Run
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono h-[400px]"
                value={yamlContent}
                onChange={(e) => setYamlContent(e.target.value)}
                placeholder="# Docker Compose YAML will appear here"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
