"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export function ContainerTerminal() {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Container terminal connected.",
    "Type 'help' for available commands.",
  ])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when history changes
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }

    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      setHistory((prev) => [...prev, `$ ${command}`])

      // Process command
      if (command === "help") {
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  ls - List files",
          "  ps - Show processes",
          "  env - Show environment variables",
          "  clear - Clear terminal",
          "  exit - Exit terminal",
        ])
      } else if (command === "ls") {
        setHistory((prev) => [...prev, "app/", "node_modules/", "package.json", "README.md"])
      } else if (command === "ps") {
        setHistory((prev) => [
          ...prev,
          "PID   USER     TIME  COMMAND",
          "1     root     0:00  node server.js",
          "24    root     0:00  sh",
        ])
      } else if (command === "env") {
        setHistory((prev) => [
          ...prev,
          "NODE_ENV=production",
          "PORT=3000",
          "DATABASE_URL=postgres://user:pass@db:5432/dbname",
        ])
      } else if (command === "clear") {
        setHistory(["Terminal cleared."])
      } else if (command === "exit") {
        setHistory((prev) => [...prev, "Disconnecting from container..."])
      } else {
        setHistory((prev) => [...prev, `Command not found: ${command}`])
      }

      setCommand("")
    }
  }

  return (
    <div className="flex flex-col h-64 bg-black text-green-400 font-mono text-sm rounded-md">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-800">
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <Input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
            placeholder="Type a command..."
          />
        </div>
      </form>
    </div>
  )
}
