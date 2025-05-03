"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface TerminalProps {
  commandHistory: string[]
  executeCommand: (command: string) => void
}

export function Terminal({ commandHistory, executeCommand }: TerminalProps) {
  const [command, setCommand] = useState("")
  const [commandIndex, setCommandIndex] = useState(-1)
  const [commandBuffer, setCommandBuffer] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when command history changes
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [commandHistory])

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      executeCommand(command.trim())
      setCommandBuffer((prev) => [...prev, command.trim()])
      setCommand("")
      setCommandIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandBuffer.length > 0) {
        const newIndex = commandIndex < commandBuffer.length - 1 ? commandIndex + 1 : commandIndex
        setCommandIndex(newIndex)
        setCommand(commandBuffer[commandBuffer.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1
        setCommandIndex(newIndex)
        setCommand(commandBuffer[commandBuffer.length - 1 - newIndex] || "")
      } else if (commandIndex === 0) {
        setCommandIndex(-1)
        setCommand("")
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-black text-green-400 font-mono text-sm">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {commandHistory.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line.startsWith("Error:") ? <span className="text-red-400">{line}</span> : line}
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
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
            placeholder="Type a command..."
          />
        </div>
      </form>
    </div>
  )
}
