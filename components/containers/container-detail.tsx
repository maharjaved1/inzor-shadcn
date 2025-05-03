"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ContainerTerminal } from "@/components/containers/container-terminal"
import {
  ArrowLeft,
  Play,
  Square,
  RefreshCw,
  Trash2,
  Terminal,
  FileText,
  Download,
  Upload,
  Copy,
  Plus,
} from "lucide-react"

interface ContainerDetailProps {
  containerId: string
}

export function ContainerDetail({ containerId }: ContainerDetailProps) {
  const router = useRouter()
  const [container, setContainer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [stats, setStats] = useState<any>(null)
  const [yamlContent, setYamlContent] = useState("")
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([
    { key: "NODE_ENV", value: "production" },
    { key: "PORT", value: "3000" },
    { key: "LOG_LEVEL", value: "info" },
  ])

  // Simulate fetching container data
  useEffect(() => {
    const fetchContainer = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setContainer({
          id: containerId,
          name: "web-server",
          image: "nginx:latest",
          status: "running",
          created: "2 days ago",
          ports: "80:80",
          cpu: 12,
          memory: 25,
          network: "bridge",
          volumes: ["/data:/var/www/html"],
          labels: {
            "com.example.description": "Web server",
            "com.example.environment": "production",
          },
          command: "nginx -g 'daemon off;'",
          entrypoint: "/docker-entrypoint.sh",
          healthcheck: {
            test: ["CMD", "curl", "-f", "http://localhost/"],
            interval: "30s",
            timeout: "10s",
            retries: 3,
          },
        })
        setLoading(false)
      }, 1000)
    }

    const fetchStats = async () => {
      // Simulate stats data
      const statsInterval = setInterval(() => {
        setStats({
          cpu: Math.floor(Math.random() * 30) + 5,
          memory: Math.floor(Math.random() * 40) + 10,
          network: {
            rx_bytes: Math.floor(Math.random() * 1000) + 100,
            tx_bytes: Math.floor(Math.random() * 500) + 50,
          },
          blockio: {
            read: Math.floor(Math.random() * 200),
            write: Math.floor(Math.random() * 100),
          },
        })
      }, 2000)

      return () => clearInterval(statsInterval)
    }

    const fetchLogs = async () => {
      // Simulate logs
      const sampleLogs = [
        "2023-05-02T12:34:56.789Z INFO  Starting Nginx server",
        "2023-05-02T12:34:57.123Z INFO  Nginx configuration loaded",
        "2023-05-02T12:34:57.456Z INFO  Listening on port 80",
        "2023-05-02T12:35:01.234Z INFO  Connection accepted from 192.168.1.5",
        "2023-05-02T12:35:01.567Z INFO  Request processed: GET /index.html",
        "2023-05-02T12:35:02.890Z INFO  Response sent: 200 OK",
        "2023-05-02T12:36:12.345Z INFO  Connection accepted from 192.168.1.10",
        "2023-05-02T12:36:12.678Z INFO  Request processed: GET /api/status",
        "2023-05-02T12:36:13.012Z INFO  Response sent: 200 OK",
        "2023-05-02T12:40:23.456Z WARN  High memory usage detected: 75%",
        "2023-05-02T12:40:24.789Z INFO  Garbage collection triggered",
        "2023-05-02T12:40:25.123Z INFO  Memory usage reduced to 45%",
      ]
      setLogs(sampleLogs)
    }

    // Generate sample YAML
    const generateYaml = () => {
      const yaml = `version: '3'
services:
  web-server:
    image: nginx:latest
    container_name: web-server
    ports:
      - "80:80"
    volumes:
      - /data:/var/www/html
    environment:
      - NODE_ENV=production
      - PORT=3000
      - LOG_LEVEL=info
    networks:
      - frontend
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  frontend:
    driver: bridge`

      setYamlContent(yaml)
    }

    fetchContainer()
    fetchStats()
    fetchLogs()
    generateYaml()
  }, [containerId])

  const handleRestart = () => {
    // Simulate container restart
    setContainer({ ...container, status: "restarting" })
    setTimeout(() => {
      setContainer({ ...container, status: "running" })
    }, 2000)
  }

  const handleStop = () => {
    // Simulate container stop
    setContainer({ ...container, status: "stopping" })
    setTimeout(() => {
      setContainer({ ...container, status: "stopped" })
    }, 1500)
  }

  const handleStart = () => {
    // Simulate container start
    setContainer({ ...container, status: "starting" })
    setTimeout(() => {
      setContainer({ ...container, status: "running" })
    }, 1500)
  }

  const handleAddEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }])
  }

  const handleEnvVarChange = (index: number, field: "key" | "value", value: string) => {
    const newEnvVars = [...envVars]
    newEnvVars[index][field] = value
    setEnvVars(newEnvVars)
  }

  const handleRemoveEnvVar = (index: number) => {
    const newEnvVars = [...envVars]
    newEnvVars.splice(index, 1)
    setEnvVars(newEnvVars)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading container details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{container.name}</h1>
          <Badge variant={container.status === "running" ? "default" : "secondary"} className="ml-2">
            {container.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          {container.status === "running" ? (
            <Button variant="outline" onClick={handleStop}>
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button variant="outline" onClick={handleStart}>
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          )}
          <Button variant="outline" onClick={handleRestart}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Restart
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Container Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="text-sm font-medium">{container.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{container.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Image</p>
                    <p className="text-sm font-medium">{container.image}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="text-sm font-medium">{container.created}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-sm font-medium">{container.status}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Ports</p>
                    <p className="text-sm font-medium">{container.ports}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Network</p>
                    <p className="text-sm font-medium">{container.network}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU</span>
                    <span>{stats?.cpu || 0}%</span>
                  </div>
                  <Progress value={stats?.cpu || 0} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory</span>
                    <span>{stats?.memory || 0}%</span>
                  </div>
                  <Progress value={stats?.memory || 0} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Network RX</p>
                    <p className="text-sm font-medium">{stats?.network?.rx_bytes || 0} KB/s</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Network TX</p>
                    <p className="text-sm font-medium">{stats?.network?.tx_bytes || 0} KB/s</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Block I/O Read</p>
                    <p className="text-sm font-medium">{stats?.blockio?.read || 0} KB/s</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Block I/O Write</p>
                    <p className="text-sm font-medium">{stats?.blockio?.write || 0} KB/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Container Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Command</h3>
                  <div className="bg-muted p-2 rounded-md text-sm font-mono">{container.command}</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Entrypoint</h3>
                  <div className="bg-muted p-2 rounded-md text-sm font-mono">{container.entrypoint}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Volumes</h3>
                <div className="bg-muted p-2 rounded-md text-sm font-mono">
                  {container.volumes.map((volume: string, index: number) => (
                    <div key={index}>{volume}</div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Labels</h3>
                <div className="bg-muted p-2 rounded-md text-sm">
                  {Object.entries(container.labels).map(([key, value]: [string, any]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <div className="font-medium">{key}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Healthcheck</h3>
                <div className="bg-muted p-2 rounded-md text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Test</div>
                    <div>{container.healthcheck.test.join(" ")}</div>
                    <div className="font-medium">Interval</div>
                    <div>{container.healthcheck.interval}</div>
                    <div className="font-medium">Timeout</div>
                    <div>{container.healthcheck.timeout}</div>
                    <div className="font-medium">Retries</div>
                    <div>{container.healthcheck.retries}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Container Logs</CardTitle>
                <CardDescription>Real-time logs from the container</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full border rounded-md bg-black text-green-400 font-mono text-sm p-4">
                {logs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap break-all">
                    {log}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Terminal className="h-4 w-4" />
                <span>Showing last 100 log entries</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="terminal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Container Terminal</CardTitle>
              <CardDescription>Interactive shell access to the container</CardDescription>
            </CardHeader>
            <CardContent>
              <ContainerTerminal />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>File Browser</CardTitle>
                <CardDescription>Browse and manage container files</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="flex items-center gap-2 p-2 border-b">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Input value="/var/www/html" className="h-8" />
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>index.html</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>style.css</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>script.js</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer">
                      <FileText className="h-4 w-4 text-yellow-500" />
                      <span>config.json</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span>README.md</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yaml" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Container YAML</CardTitle>
                <CardDescription>View and edit container configuration</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                className="font-mono h-[400px]"
                value={yamlContent}
                onChange={(e) => setYamlContent(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Manage container environment variables</CardDescription>
              </div>
              <Button size="sm" onClick={handleAddEnvVar}>
                <Plus className="h-4 w-4 mr-1" />
                Add Variable
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {envVars.map((envVar, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Key"
                      value={envVar.key}
                      onChange={(e) => handleEnvVarChange(index, "key", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value"
                      value={envVar.value}
                      onChange={(e) => handleEnvVarChange(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveEnvVar(index)} className="h-10 w-10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Statistics</CardTitle>
              <CardDescription>Real-time container resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">CPU Usage</h3>
                    <span className="text-sm">{stats?.cpu || 0}%</span>
                  </div>
                  <Progress value={stats?.cpu || 0} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Memory Usage</h3>
                    <span className="text-sm">{stats?.memory || 0}%</span>
                  </div>
                  <Progress value={stats?.memory || 0} className="h-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Network I/O</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">RX (Download)</span>
                          <span>{stats?.network?.rx_bytes || 0} KB/s</span>
                        </div>
                        <Progress
                          value={stats?.network?.rx_bytes ? Math.min(stats.network.rx_bytes / 10, 100) : 0}
                          className="h-1"
                        />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">TX (Upload)</span>
                          <span>{stats?.network?.tx_bytes || 0} KB/s</span>
                        </div>
                        <Progress
                          value={stats?.network?.tx_bytes ? Math.min(stats.network.tx_bytes / 5, 100) : 0}
                          className="h-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Block I/O</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Read</span>
                          <span>{stats?.blockio?.read || 0} KB/s</span>
                        </div>
                        <Progress
                          value={stats?.blockio?.read ? Math.min(stats.blockio.read / 2, 100) : 0}
                          className="h-1"
                        />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Write</span>
                          <span>{stats?.blockio?.write || 0} KB/s</span>
                        </div>
                        <Progress
                          value={stats?.blockio?.write ? Math.min(stats.blockio.write / 1, 100) : 0}
                          className="h-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
