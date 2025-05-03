"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AlertCircle, TerminalIcon, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Terminal } from "@/components/ui/terminal"

// Sample container data
const containers = [
  { id: "c1", name: "web-server", image: "nginx:latest", status: "running" },
  { id: "c2", name: "database", image: "postgres:13", status: "running" },
  { id: "c3", name: "cache", image: "redis:alpine", status: "running" },
  { id: "c4", name: "api", image: "node:16", status: "stopped" },
]

export function ContainerShell() {
  const [selectedContainer, setSelectedContainer] = useState("")
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [output, setOutput] = useState<string[]>([
    "Welcome to Container Shell",
    "Select a container and enter commands to interact with it",
    "-----------------------------------------------------------",
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Commands that can be simulated
  const commands: Record<string, (args: string[]) => string> = {
    ls: (args) => {
      if (args.includes("-la")) {
        return "total 20\ndrwxr-xr-x 5 root root 4096 May 3 12:34 .\ndrwxr-xr-x 5 root root 4096 May 3 12:34 ..\n-rw-r--r-- 1 root root  220 May 3 12:34 .bash_logout\n-rw-r--r-- 1 root root 3771 May 3 12:34 .bashrc\ndrwxr-xr-x 3 root root 4096 May 3 12:34 app\ndrwxr-xr-x 2 root root 4096 May 3 12:34 config\n-rwxr-xr-x 1 root root  345 May 3 12:34 entrypoint.sh\ndrwxr-xr-x 2 root root 4096 May 3 12:34 logs"
      }
      return "app  config  entrypoint.sh  logs"
    },
    pwd: () => "/app",
    whoami: () => "root",
    ps: () => {
      if (selectedContainer === "c1") {
        return "  PID TTY          TIME CMD\n    1 ?        00:00:00 nginx\n   21 ?        00:00:00 nginx"
      } else if (selectedContainer === "c2") {
        return "  PID TTY          TIME CMD\n    1 ?        00:00:00 postgres"
      } else if (selectedContainer === "c3") {
        return "  PID TTY          TIME CMD\n    1 ?        00:00:00 redis-server"
      } else {
        return "  PID TTY          TIME CMD\n    1 ?        00:00:00 node\n   15 ?        00:00:00 npm"
      }
    },
    cat: (args) => {
      if (args.length === 0) {
        return "cat: missing file operand"
      }
      if (args[0] === "/etc/hostname") {
        return containers.find((c) => c.id === selectedContainer)?.name || "unknown"
      }
      if (args[0] === "/etc/os-release") {
        return 'NAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.16.0\nPRETTY_NAME="Alpine Linux v3.16"\nHOME_URL="https://alpinelinux.org/"\nBUG_REPORT_URL="https://bugs.alpinelinux.org/"'
      }
      return `cat: ${args[0]}: No such file or directory`
    },
    echo: (args) => args.join(" "),
    help: () => "Available commands: ls, pwd, whoami, ps, cat, echo, clear, help",
    clear: () => {
      setOutput(["Terminal cleared"])
      return ""
    },
  }

  const executeCommand = () => {
    if (!command.trim()) return
    if (!selectedContainer) {
      setOutput([...output, "Error: No container selected"])
      return
    }

    const container = containers.find((c) => c.id === selectedContainer)
    if (container?.status !== "running") {
      setOutput([...output, `Error: Container ${container?.name} is not running`])
      return
    }

    // Add command to history
    setHistory([...history, command])
    setHistoryIndex(-1)

    // Add command to output
    const newOutput = [...output, `root@${container.name}:~# ${command}`]

    // Parse command
    const parts = command.trim().split(" ")
    const cmd = parts[0]
    const args = parts.slice(1)

    // Execute command
    if (cmd in commands) {
      const result = commands[cmd](args)
      if (result) {
        newOutput.push(result)
      }
    } else {
      newOutput.push(`bash: ${cmd}: command not found`)
    }

    setOutput(newOutput)
    setCommand("")

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  // Focus input when container changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedContainer])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5" />
          Container Shell
        </CardTitle>
        <CardDescription>Execute commands directly in your running containers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="container-select">Select Container</Label>
          <Select
            value={selectedContainer}
            onValueChange={(value) => {
              setSelectedContainer(value)
              const container = containers.find((c) => c.id === value)
              if (container) {
                if (container.status === "running") {
                  setOutput([
                    ...output,
                    `Connected to container: ${container.name} (${container.image})`,
                    `Type 'help' to see available commands`,
                  ])
                } else {
                  toast({
                    variant: "destructive",
                    title: "Container not running",
                    description: `Container ${container.name} is not in running state`,
                  })
                }
              }
            }}
          >
            <SelectTrigger id="container-select">
              <SelectValue placeholder="Select a container" />
            </SelectTrigger>
            <SelectContent>
              {containers.map((container) => (
                <SelectItem key={container.id} value={container.id} disabled={container.status !== "running"}>
                  {container.name} ({container.status})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedContainer && containers.find((c) => c.id === selectedContainer)?.status !== "running" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              The selected container is not running. Please start the container or select a different one.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="terminal-output">Terminal</Label>
          <Terminal ref={terminalRef} className="h-80 overflow-auto">
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </Terminal>
        </div>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            id="command-input"
            placeholder={selectedContainer ? "Enter command..." : "Select a container first"}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!selectedContainer || containers.find((c) => c.id === selectedContainer)?.status !== "running"}
            className="font-mono"
          />
          <Button
            onClick={executeCommand}
            disabled={
              !command.trim() ||
              !selectedContainer ||
              containers.find((c) => c.id === selectedContainer)?.status !== "running"
            }
          >
            Execute
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setOutput(["Terminal cleared"])
          }}
        >
          Clear Terminal
        </Button>
        <Button
          variant="destructive"
          className="gap-2"
          onClick={() => {
            setSelectedContainer("")
            setOutput([
              "Welcome to Container Shell",
              "Select a container and enter commands to interact with it",
              "-----------------------------------------------------------",
            ])
          }}
        >
          <X className="h-4 w-4" />
          <span>Disconnect</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
