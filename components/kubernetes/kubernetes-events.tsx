"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface KubernetesEventsProps {
  workloadName: string
  namespace: string
}

// Mock events data
const mockEvents = [
  {
    type: "Normal",
    reason: "Scheduled",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Successfully assigned default/frontend-deployment-5d8b9f7b5-2xqnl to node-1",
    count: 1,
    age: "10m",
  },
  {
    type: "Normal",
    reason: "Pulled",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Container image nginx:latest already present on machine",
    count: 1,
    age: "10m",
  },
  {
    type: "Normal",
    reason: "Created",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Created container frontend",
    count: 1,
    age: "10m",
  },
  {
    type: "Normal",
    reason: "Started",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Started container frontend",
    count: 1,
    age: "10m",
  },
  {
    type: "Warning",
    reason: "Unhealthy",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Readiness probe failed: HTTP probe failed with statuscode: 404",
    count: 3,
    age: "8m",
  },
  {
    type: "Normal",
    reason: "Killing",
    object: "Pod/frontend-deployment-5d8b9f7b5-2xqnl",
    message: "Stopping container frontend",
    count: 1,
    age: "7m",
  },
  {
    type: "Normal",
    reason: "Scheduled",
    object: "Pod/frontend-deployment-5d8b9f7b5-3abcd",
    message: "Successfully assigned default/frontend-deployment-5d8b9f7b5-3abcd to node-2",
    count: 1,
    age: "7m",
  },
  {
    type: "Normal",
    reason: "Pulled",
    object: "Pod/frontend-deployment-5d8b9f7b5-3abcd",
    message: "Container image nginx:latest already present on machine",
    count: 1,
    age: "7m",
  },
  {
    type: "Normal",
    reason: "Created",
    object: "Pod/frontend-deployment-5d8b9f7b5-3abcd",
    message: "Created container frontend",
    count: 1,
    age: "7m",
  },
  {
    type: "Normal",
    reason: "Started",
    object: "Pod/frontend-deployment-5d8b9f7b5-3abcd",
    message: "Started container frontend",
    count: 1,
    age: "7m",
  },
]

export function KubernetesEvents({ workloadName, namespace }: KubernetesEventsProps) {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    setLoading(true)
    // Simulate API call to fetch events
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }

  const handleRefresh = () => {
    fetchEvents()
    toast({
      title: "Events refreshed",
      description: "The latest events have been fetched",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Events</CardTitle>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Recent events related to {workloadName} in namespace {namespace}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Object</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${event.type === "Warning" ? "bg-yellow-500" : "bg-green-500"}`}
                    ></span>
                    {event.type}
                  </TableCell>
                  <TableCell>{event.reason}</TableCell>
                  <TableCell className="font-mono text-xs">{event.object}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-md truncate">{event.message}</TableCell>
                  <TableCell>{event.count}</TableCell>
                  <TableCell>{event.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
