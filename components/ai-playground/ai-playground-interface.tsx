"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code, MessageSquare, Download, Copy, Terminal, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AIPlaygroundInterface() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1024])
  const [streamResponse, setStreamResponse] = useState(true)
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    {
      role: "system",
      content:
        "I'm your DevOps AI assistant. I can help you with container management, Kubernetes, and other cloud infrastructure tasks.",
    },
  ])
  const [codeSnippet, setCodeSnippet] = useState("")
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [requestedCommand, setRequestedCommand] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setChatHistory([...chatHistory, { role: "user", content: prompt }])
    setPrompt("")

    // Simulate streaming response
    let fullResponse = ""
    const responses = [
      "I'll help you with that. Let me think...\n\n",
      "Based on your request, here's what I can provide:\n\n",
      "The cloud platform you're building seems to be a comprehensive DevOps solution. Here are some key components you might want to consider:\n\n",
      "1. **Container Orchestration**: Kubernetes integration for managing containerized applications\n\n",
      "2. **CI/CD Pipeline**: Automated workflows for building, testing, and deploying applications\n\n",
      "3. **Monitoring and Logging**: Real-time visibility into application performance and logs\n\n",
      "4. **Database Management**: Tools for provisioning and managing databases\n\n",
      "5. **Security**: Authentication, authorization, and security scanning\n\n",
      "Would you like me to elaborate on any specific aspect of this cloud platform architecture?",
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < responses.length) {
        fullResponse += responses[i]
        setResponse(fullResponse)
        i++
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        setChatHistory([
          ...chatHistory,
          { role: "user", content: prompt },
          { role: "assistant", content: fullResponse },
        ])
        setResponse("")

        // Check if the prompt contains a command that requires permission
        if (
          prompt.toLowerCase().includes("sudo") ||
          prompt.toLowerCase().includes("rm -rf") ||
          prompt.toLowerCase().includes("delete") ||
          prompt.toLowerCase().includes("restart")
        ) {
          setRequestedCommand(prompt)
          setShowPermissionDialog(true)
        }

        // Generate code snippet if the prompt is code-related
        if (
          prompt.toLowerCase().includes("code") ||
          prompt.toLowerCase().includes("script") ||
          prompt.toLowerCase().includes("yaml") ||
          prompt.toLowerCase().includes("dockerfile")
        ) {
          if (prompt.toLowerCase().includes("docker") || prompt.toLowerCase().includes("container")) {
            setCodeSnippet(`version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: always`)
          } else if (prompt.toLowerCase().includes("kubernetes") || prompt.toLowerCase().includes("k8s")) {
            setCodeSnippet(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80`)
          } else {
            setCodeSnippet(`#!/bin/bash
# Sample script to check container status
docker ps -a | grep "web-server"
if [ $? -eq 0 ]; then
  echo "Container is running"
else
  echo "Container is not running"
  docker start web-server
fi`)
          }
          setActiveTab("code")
        }
      }
    }, 500)
  }

  const handleSendMessage = () => {
    if (!prompt.trim()) return

    setChatHistory([...chatHistory, { role: "user", content: prompt }])

    // Simulate AI response
    setIsGenerating(true)
    setTimeout(() => {
      let aiResponse = ""

      if (prompt.toLowerCase().includes("container")) {
        aiResponse =
          "I can help you manage containers. Would you like me to show you how to create, start, stop, or remove containers?"
      } else if (prompt.toLowerCase().includes("kubernetes")) {
        aiResponse =
          "Kubernetes is a powerful container orchestration platform. I can help you with deployments, services, and other Kubernetes resources."
      } else if (prompt.toLowerCase().includes("docker")) {
        aiResponse =
          "Docker is a platform for developing, shipping, and running applications in containers. What specific Docker task do you need help with?"
      } else {
        aiResponse =
          "I'm your DevOps assistant. I can help with containers, Kubernetes, CI/CD, and other cloud infrastructure tasks. What would you like to know?"
      }

      setChatHistory((prev) => [...prev, { role: "assistant", content: aiResponse }])
      setIsGenerating(false)
    }, 1000)

    setPrompt("")
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet)
  }

  const handleApproveCommand = () => {
    // Simulate command execution
    setChatHistory((prev) => [
      ...prev,
      {
        role: "system",
        content: `Command "${requestedCommand}" has been approved and executed successfully.`,
      },
    ])
    setShowPermissionDialog(false)
  }

  const handleRejectCommand = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        role: "system",
        content: `Command "${requestedCommand}" has been rejected for security reasons.`,
      },
    ])
    setShowPermissionDialog(false)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Playground</CardTitle>
        <CardDescription>Interact with AI models to generate content and manage your infrastructure</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="terminal">
              <Terminal className="h-4 w-4 mr-2" />
              Terminal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
            <ScrollArea className="flex-1 pr-4 h-[400px] border rounded-md p-4">
              {chatHistory
                .filter((msg) => msg.role !== "system" || (msg.role === "system" && msg.content.includes("has been")))
                .map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                    {message.role !== "user" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.role === "system"
                            ? "bg-muted text-muted-foreground"
                            : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Ask about containers, Kubernetes, or other DevOps tasks..."
                  className="min-h-[100px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Temperature: {temperature[0]}</Label>
                  </div>
                  <Slider value={temperature} min={0} max={1} step={0.1} onValueChange={setTemperature} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Max Tokens: {maxTokens[0]}</Label>
                  </div>
                  <Slider value={maxTokens} min={256} max={4096} step={256} onValueChange={setMaxTokens} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="stream" checked={streamResponse} onCheckedChange={setStreamResponse} />
                  <Label htmlFor="stream">Stream response</Label>
                </div>
                <Button className="w-full" onClick={handleSendMessage} disabled={isGenerating || !prompt.trim()}>
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Generated Code</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 h-[400px] border rounded-md bg-muted p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap">{codeSnippet}</pre>
            </ScrollArea>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Ask for a Docker compose file, Kubernetes manifest, or shell script..."
                  className="min-h-[100px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <Button className="w-full" onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      Generate Code
                    </>
                  )}
                </Button>
                <div className="space-y-2">
                  <Label>Code Type</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Docker
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Kubernetes
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      Shell
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                      YAML
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Terminal Access</h3>
              <Badge variant="outline">Requires Approval</Badge>
            </div>
            <ScrollArea className="flex-1 h-[400px] border rounded-md bg-black text-green-500 p-4 font-mono">
              <div className="whitespace-pre-wrap">
                $ ls -la total 32 drwxr-xr-x 5 user staff 160 May 3 20:39 . drwxr-xr-x 8 user staff 256 May 3 20:38 ..
                -rw-r--r-- 1 user staff 1256 May 3 20:39 Dockerfile -rw-r--r-- 1 user staff 321 May 3 20:39
                docker-compose.yml drwxr-xr-x 12 user staff 384 May 3 20:39 src $ docker ps CONTAINER ID IMAGE COMMAND
                CREATED STATUS PORTS NAMES a1b2c3d4e5f6 nginx:latest "/docker-entrypoint.…" 2 hours ago Up 2 hours
                0.0.0.0:80-&gt;80/tcp web-server f6e5d4c3b2a1 redis:latest "docker-entrypoint.s…" 2 hours ago Up 2 hours
                0.0.0.0:6379-&gt;6379/tcp redis-cache $ _
              </div>
            </ScrollArea>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Enter command (requires approval)..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setRequestedCommand(prompt)
                    setShowPermissionDialog(true)
                    setPrompt("")
                  }}
                  disabled={!prompt.trim()}
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  Request Execution
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Command Requires Approval
            </DialogTitle>
            <DialogDescription>
              The following command requires administrator approval before execution:
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-3 rounded-md font-mono text-sm">{requestedCommand}</div>
          <p className="text-sm text-muted-foreground">
            This command may modify system state or access sensitive resources. Please confirm that you want to execute
            this command.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={handleRejectCommand}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApproveCommand}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
