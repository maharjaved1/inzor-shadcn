"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

// Sample log data
const logs = [
  {
    id: "log1",
    timestamp: "2023-05-02T12:34:56Z",
    level: "info",
    source: "containers",
    message: "Container web-server started successfully",
  },
  {
    id: "log2",
    timestamp: "2023-05-02T12:35:10Z",
    level: "info",
    source: "kubernetes",
    message: "Pod frontend-7d8f9b7b5-abcd1 scheduled on node worker-1",
  },
  {
    id: "log3",
    timestamp: "2023-05-02T12:36:22Z",
    level: "warn",
    source: "system",
    message: "High CPU usage detected on node worker-2",
  },
  {
    id: "log4",
    timestamp: "2023-05-02T12:37:45Z",
    level: "error",
    source: "containers",
    message: "Container api-service exited with code 1",
  },
  {
    id: "log5",
    timestamp: "2023-05-02T12:38:12Z",
    level: "debug",
    source: "databases",
    message: "Database connection pool initialized with 10 connections",
  },
  {
    id: "log6",
    timestamp: "2023-05-02T12:39:30Z",
    level: "info",
    source: "kubernetes",
    message: "Service frontend-service endpoint updated",
  },
  {
    id: "log7",
    timestamp: "2023-05-02T12:40:15Z",
    level: "warn",
    source: "databases",
    message: "Slow query detected: SELECT * FROM users WHERE last_login > '2023-01-01'",
  },
  {
    id: "log8",
    timestamp: "2023-05-02T12:41:05Z",
    level: "error",
    source: "system",
    message: "Failed to allocate memory for new container",
  },
  {
    id: "log9",
    timestamp: "2023-05-02T12:42:22Z",
    level: "info",
    source: "containers",
    message: "Image nginx:latest pulled successfully",
  },
  {
    id: "log10",
    timestamp: "2023-05-02T12:43:17Z",
    level: "debug",
    source: "kubernetes",
    message: "ConfigMap app-config mounted to pod frontend-7d8f9b7b5-abcd1",
  },
  {
    id: "log11",
    timestamp: "2023-05-02T12:44:30Z",
    level: "info",
    source: "system",
    message: "System update scheduled for 2023-05-03T01:00:00Z",
  },
  {
    id: "log12",
    timestamp: "2023-05-02T12:45:12Z",
    level: "error",
    source: "databases",
    message: "Connection to database staging-db lost",
  },
  {
    id: "log13",
    timestamp: "2023-05-02T12:46:05Z",
    level: "warn",
    source: "containers",
    message: "Container cache using high memory",
  },
  {
    id: "log14",
    timestamp: "2023-05-02T12:47:22Z",
    level: "info",
    source: "kubernetes",
    message: "Horizontal Pod Autoscaler increased replicas from 3 to 5",
  },
  {
    id: "log15",
    timestamp: "2023-05-02T12:48:17Z",
    level: "debug",
    source: "system",
    message: "Network traffic spike detected on port 443",
  },
]

export function LogViewer() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "destructive"
      case "warn":
        return "warning"
      case "info":
        return "default"
      case "debug":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Log Viewer</CardTitle>
            <CardDescription>Real-time system and application logs</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] border rounded-md">
          <div className="p-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-2 border-b last:border-0 hover:bg-muted/50 cursor-pointer ${
                  selectedLog === log.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedLog(log.id === selectedLog ? null : log.id)}
              >
                <div className="flex items-start gap-2">
                  <Badge variant={getLevelColor(log.level) as any} className="uppercase text-xs">
                    {log.level}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{log.source}</span>
                      <span className="text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <p className="text-sm mt-1">{log.message}</p>
                    {selectedLog === log.id && (
                      <div className="mt-2 text-xs bg-muted p-2 rounded-md">
                        <div>
                          <span className="font-medium">Timestamp:</span> {log.timestamp}
                        </div>
                        <div>
                          <span className="font-medium">Source:</span> {log.source}
                        </div>
                        <div>
                          <span className="font-medium">Level:</span> {log.level}
                        </div>
                        <div>
                          <span className="font-medium">Message:</span> {log.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
