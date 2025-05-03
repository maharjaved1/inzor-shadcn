"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Bot, Code, Send, Terminal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AiContainerAssistant() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI container assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")
  const [codeType, setCodeType] = useState("docker")
  const [command, setCommand] = useState("")
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [pendingCommand, setPendingCommand] = useState("")
  const [commandOutput, setCommandOutput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateAiResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInput("")
  }

  const generateAiResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("create container") || input.includes("new container")) {
      return "I can help you create a new container. Would you like to use a pre-built image or create a custom Dockerfile?"
    } else if (input.includes("kubernetes") || input.includes("k8s")) {
      return "For Kubernetes deployments, I recommend using a declarative YAML approach. Would you like me to generate a sample deployment YAML for you?"
    } else if (input.includes("docker")) {
      return "Docker is a great containerization platform. I can help you with Docker commands, Dockerfile creation, or container management. What specifically do you need help with?"
    } else if (input.includes("error") || input.includes("issue")) {
      return "I'm sorry to hear you're experiencing issues. Could you share the error message or logs so I can help troubleshoot?"
    } else {
      return "I understand you're interested in container management. Could you provide more details about what you're trying to accomplish?"
    }
  }

  const handleGenerateCode = () => {
    let generatedCode = ""

    if (codeType === "docker") {
      generatedCode = `# Dockerfile for a Node.js application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`
    } else if (codeType === "kubernetes") {
      generatedCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
  labels:
    app: nodejs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
      - name: nodejs
        image: nodejs-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "0.5"
            memory: "512Mi"
          requests:
            cpu: "0.2"
            memory: "256Mi"`
    } else if (codeType === "shell") {
      generatedCode = `#!/bin/bash

# Script to build and run a Docker container

IMAGE_NAME="my-app"
CONTAINER_NAME="my-app-container"
PORT=3000

echo "Building Docker image..."
docker build -t $IMAGE_NAME .

echo "Running container..."
docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME

echo "Container started! Access at http://localhost:$PORT"`
    }

    setCode(generatedCode)
  }

  const handleRunCommand = () => {
    if (!command.trim()) return

    // Check if command requires permission
    if (
      command.includes("rm") ||
      command.includes("delete") ||
      command.includes("stop") ||
      command.includes("kill") ||
      command.includes("exec")
    ) {
      setPendingCommand(command)
      setShowPermissionDialog(true)
      return
    }

    executeCommand(command)
  }

  const executeCommand = (cmd: string) => {
    setCommandOutput(`Executing: ${cmd}\n`)

    // Simulate command execution
    setTimeout(() => {
      let output = ""

      if (cmd.includes("ls") || cmd.includes("list")) {
        output = `CONTAINER ID   IMAGE          COMMAND        CREATED       STATUS       PORTS                    NAMES
a1b2c3d4e5f6   nginx:latest    "/docker-entrypoint.…"   2 hours ago   Up 2 hours   0.0.0.0:80->80/tcp       web-server
f6e5d4c3b2a1   redis:latest    "docker-entrypoint.s…"   3 hours ago   Up 3 hours   0.0.0.0:6379->6379/tcp   redis-cache
1a2b3c4d5e6f   mongo:latest    "docker-entrypoint.s…"   5 hours ago   Up 5 hours   0.0.0.0:27017->27017/tcp mongodb`
      } else if (cmd.includes("inspect")) {
        output = `[
  {
    "Id": "a1b2c3d4e5f6",
    "Name": "/web-server",
    "State": {
      "Status": "running",
      "Running": true,
      "Paused": false,
      "Restarting": false,
      "OOMKilled": false,
      "Dead": false,
      "Pid": 1234,
      "ExitCode": 0,
      "Error": "",
      "StartedAt": "2023-05-01T10:00:00Z",
      "FinishedAt": "0001-01-01T00:00:00Z"
    },
    "Image": "nginx:latest",
    "NetworkSettings": {
      "Networks": {
        "bridge": {
          "IPAddress": "172.17.0.2",
          "Gateway": "172.17.0.1"
        }
      },
      "Ports": {
        "80/tcp": [
          {
            "HostIp": "0.0.0.0",
            "HostPort": "80"
          }
        ]
      }
    }
  }
]`
      } else if (cmd.includes("stats")) {
        output = `CONTAINER ID   NAME         CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
a1b2c3d4e5f6   web-server   0.15%     21.48MiB / 1.952GiB   1.07%     648kB / 3.78MB     0B / 0B           2
f6e5d4c3b2a1   redis-cache  0.36%     7.164MiB / 1.952GiB   0.36%     836kB / 1.46MB     0B / 0B           4
1a2b3c4d5e6f   mongodb      1.22%     44.27MiB / 1.952GiB   2.21%     1.23MB / 2.31MB    0B / 0B           11`
      } else {
        output = `Command executed successfully.`
      }

      setCommandOutput((prev) => prev + "\n" + output)
      setCommand("")
    }, 500)
  }

  const handlePermissionResponse = (approved: boolean) => {
    setShowPermissionDialog(false)

    if (approved) {
      executeCommand(pendingCommand)
    } else {
      setCommandOutput((prev) => prev + "\nCommand execution cancelled due to permission denial.")
    }

    setPendingCommand("")
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="chat">
            <Bot className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="mr-2 h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="terminal">
            <Terminal className="mr-2 h-4 w-4" />
            Terminal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="h-[calc(100vh-12rem)]">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>AI Container Assistant</CardTitle>
              <CardDescription>
                Ask questions about container management, deployments, and best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="space-y-4 pr-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${message.role === "assistant" ? "" : "flex-row-reverse"}`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{message.role === "assistant" ? "AI" : "U"}</AvatarFallback>
                          <AvatarImage
                            src={message.role === "assistant" ? "/placeholder.svg?height=32&width=32" : undefined}
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "assistant"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {message.content}
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="Ask about container management..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="h-[calc(100vh-12rem)]">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Code Generation</CardTitle>
              <CardDescription>Generate Docker, Kubernetes, and shell script examples</CardDescription>
              <div className="flex space-x-2 mt-2">
                <Button
                  variant={codeType === "docker" ? "default" : "outline"}
                  onClick={() => setCodeType("docker")}
                  size="sm"
                >
                  Dockerfile
                </Button>
                <Button
                  variant={codeType === "kubernetes" ? "default" : "outline"}
                  onClick={() => setCodeType("kubernetes")}
                  size="sm"
                >
                  Kubernetes
                </Button>
                <Button
                  variant={codeType === "shell" ? "default" : "outline"}
                  onClick={() => setCodeType("shell")}
                  size="sm"
                >
                  Shell Script
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-[calc(100vh-24rem)]">
                <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                  <code>{code || `Click "Generate" to create ${codeType} code example`}</code>
                </pre>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateCode}>Generate Example</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="terminal" className="h-[calc(100vh-12rem)]">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Container Terminal</CardTitle>
              <CardDescription>Run container management commands with AI assistance</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Permissions Required</AlertTitle>
                <AlertDescription>
                  Destructive commands will require explicit permission before execution
                </AlertDescription>
              </Alert>
              <ScrollArea className="h-[calc(100vh-28rem)] bg-black text-green-400 font-mono p-4 rounded-md">
                <div className="whitespace-pre-wrap">
                  {commandOutput || "# Terminal ready. Type a command to begin."}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="docker ps"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleRunCommand()
                    }
                  }}
                  className="flex-1 font-mono"
                />
                <Button size="icon" onClick={handleRunCommand}>
                  <Terminal className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permission Required</DialogTitle>
            <DialogDescription>The following command requires explicit permission:</DialogDescription>
          </DialogHeader>
          <pre className="bg-secondary p-4 rounded-md my-4 overflow-x-auto">
            <code>{pendingCommand}</code>
          </pre>
          <p className="text-amber-500 flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4" />
            This command may modify or delete container resources
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => handlePermissionResponse(false)}>
              Deny
            </Button>
            <Button onClick={() => handlePermissionResponse(true)}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
