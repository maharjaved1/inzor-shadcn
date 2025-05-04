"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Terminal } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface KubernetesTerminalProps {
  workloadName: string
  namespace: string
}

export function KubernetesTerminal({ workloadName, namespace }: KubernetesTerminalProps) {
  const [output, setOutput] = useState<string[]>(["Connecting to pod..."])
  const [connected, setConnected] = useState(false)
  const [command, setCommand] = useState("")

  useEffect(() => {
    // Simulate connecting to a pod
    const timer = setTimeout(() => {
      setOutput((prev) => [...prev, "Connected to pod. Type commands below."])
      setConnected(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    // Add the command to the output
    setOutput((prev) => [...prev, `$ ${command}`])

    // Simulate command execution
    setTimeout(() => {
      let response: string

      switch (command.toLowerCase()) {
        case "ls":
          response = "app  bin  etc  lib  tmp  usr  var"
          break
        case "pwd":
          response = "/app"
          break
        case "ps":
          response =
            "PID   USER     TIME  COMMAND\n  1   root      0:00  /bin/sh\n 20   root      0:00  nginx: master process\n 21   nginx     0:00  nginx: worker process"
          break
        default:
          response = `Command not found: ${command}`
      }

      setOutput((prev) => [...prev, response])
      setCommand("")
    }, 500)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Terminal className="mr-2 h-4 w-4" />
          Terminal
        </CardTitle>
        <CardDescription>
          Connected to {workloadName} in namespace {namespace}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-black text-green-400 font-mono p-4 rounded-md h-80 overflow-y-auto">
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          {connected && (
            <form onSubmit={handleCommand} className="flex items-center mt-2">
              <span className="mr-2">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none"
                autoFocus
              />
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
