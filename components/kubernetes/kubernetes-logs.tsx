"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface KubernetesLogsProps {
  workloadName: string
  namespace: string
}

// Mock log data
const mockLogs = [
  "2023-05-04T12:00:01Z INFO  Starting application",
  "2023-05-04T12:00:02Z INFO  Connected to database",
  "2023-05-04T12:00:03Z INFO  Listening on port 8080",
  "2023-05-04T12:00:10Z DEBUG Processing request /api/users",
  "2023-05-04T12:00:11Z INFO  Request completed in 120ms",
  "2023-05-04T12:00:20Z DEBUG Processing request /api/products",
  "2023-05-04T12:00:21Z WARN  Slow query detected (300ms)",
  "2023-05-04T12:00:22Z INFO  Request completed in 350ms",
  "2023-05-04T12:00:30Z ERROR Failed to connect to cache server",
  "2023-05-04T12:00:31Z INFO  Retrying cache connection",
  "2023-05-04T12:00:32Z INFO  Connected to cache server",
  "2023-05-04T12:00:40Z DEBUG Processing request /api/orders",
  "2023-05-04T12:00:41Z INFO  Request completed in 80ms",
]

export function KubernetesLogs({ workloadName, namespace }: KubernetesLogsProps) {
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [container, setContainer] = useState("app")
  const { toast } = useToast()

  useEffect(() => {
    fetchLogs()
  }, [container])

  const fetchLogs = () => {
    setLoading(true)
    // Simulate API call to fetch logs
    setTimeout(() => {
      setLogs(mockLogs)
      setLoading(false)
    }, 1000)
  }

  const handleRefresh = () => {
    fetchLogs()
    toast({
      title: "Logs refreshed",
      description: "The latest logs have been fetched",
    })
  }

  const handleDownload = () => {
    // Create a blob with the logs
    const blob = new Blob([logs.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    // Create a link and click it to download
    const a = document.createElement("a")
    a.href = url
    a.download = `${workloadName}-${container}-logs.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Logs downloaded",
      description: `Saved as ${workloadName}-${container}-logs.txt`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Pod Logs</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={container} onValueChange={setContainer}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select container" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">app</SelectItem>
                <SelectItem value="sidecar">sidecar</SelectItem>
                <SelectItem value="init">init</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Logs from container {container} in {workloadName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-black text-green-400 font-mono p-4 rounded-md h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {log}
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Logs
        </Button>
      </CardFooter>
    </Card>
  )
}
