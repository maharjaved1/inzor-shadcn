"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KubernetesHeader } from "@/components/kubernetes/kubernetes-header"
import { KubernetesTerminal } from "@/components/kubernetes/kubernetes-terminal"
import { KubernetesYaml } from "@/components/kubernetes/kubernetes-yaml"
import { KubernetesLogs } from "@/components/kubernetes/kubernetes-logs"
import { KubernetesEvents } from "@/components/kubernetes/kubernetes-events"

// Mock data for Kubernetes workload
const mockWorkload = {
  id: "1",
  name: "frontend-deployment",
  namespace: "default",
  type: "Deployment",
  status: "Running",
  age: "2d",
  pods: "3/3",
  cpu: "120m",
  memory: "256Mi",
  yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 200m
            memory: 256Mi
          requests:
            cpu: 100m
            memory: 128Mi`,
}

export default function KubernetesDetailPage() {
  const params = useParams()
  const [workload, setWorkload] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch workload details
    const fetchWorkload = async () => {
      setLoading(true)
      // In a real app, you would fetch the workload details from an API
      // For now, we'll use mock data
      setTimeout(() => {
        setWorkload(mockWorkload)
        setLoading(false)
      }, 1000)
    }

    fetchWorkload()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 p-8">
      <KubernetesHeader title={`Workload: ${workload.name}`} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Status</CardTitle>
            <CardDescription>Current status of the workload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${workload.status === "Running" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span>{workload.status}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pods</CardTitle>
            <CardDescription>Running pods</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{workload.pods}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>CPU and Memory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>CPU: {workload.cpu}</p>
              <p>Memory: {workload.memory}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="yaml" className="w-full">
        <TabsList>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="yaml">
          <KubernetesYaml yaml={workload.yaml} />
        </TabsContent>
        <TabsContent value="terminal">
          <KubernetesTerminal workloadName={workload.name} namespace={workload.namespace} />
        </TabsContent>
        <TabsContent value="logs">
          <KubernetesLogs workloadName={workload.name} namespace={workload.namespace} />
        </TabsContent>
        <TabsContent value="events">
          <KubernetesEvents workloadName={workload.name} namespace={workload.namespace} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}
