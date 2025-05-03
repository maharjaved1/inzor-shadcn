"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, Terminal, Trash2 } from "lucide-react"

const deployments = [
  {
    id: "d1",
    name: "frontend",
    namespace: "default",
    replicas: "3/3",
    status: "Running",
    age: "2d",
  },
  {
    id: "d2",
    name: "backend-api",
    namespace: "default",
    replicas: "2/2",
    status: "Running",
    age: "1d",
  },
  {
    id: "d3",
    name: "database",
    namespace: "db",
    replicas: "1/1",
    status: "Running",
    age: "5d",
  },
  {
    id: "d4",
    name: "cache",
    namespace: "default",
    replicas: "0/2",
    status: "Failed",
    age: "12h",
  },
]

const pods = [
  {
    id: "p1",
    name: "frontend-7d8f9b7b5-abcd1",
    namespace: "default",
    status: "Running",
    restarts: 0,
    age: "2d",
  },
  {
    id: "p2",
    name: "frontend-7d8f9b7b5-abcd2",
    namespace: "default",
    status: "Running",
    restarts: 0,
    age: "2d",
  },
  {
    id: "p3",
    name: "frontend-7d8f9b7b5-abcd3",
    namespace: "default",
    status: "Running",
    restarts: 1,
    age: "2d",
  },
  {
    id: "p4",
    name: "backend-api-6b7c8d9e-def1",
    namespace: "default",
    status: "Running",
    restarts: 0,
    age: "1d",
  },
  {
    id: "p5",
    name: "backend-api-6b7c8d9e-def2",
    namespace: "default",
    status: "Running",
    restarts: 0,
    age: "1d",
  },
  {
    id: "p6",
    name: "database-5f6g7h8i-ghi1",
    namespace: "db",
    status: "Running",
    restarts: 2,
    age: "5d",
  },
  {
    id: "p7",
    name: "cache-4e5f6g7h-jkl1",
    namespace: "default",
    status: "CrashLoopBackOff",
    restarts: 5,
    age: "12h",
  },
]

const services = [
  {
    id: "s1",
    name: "frontend",
    namespace: "default",
    type: "LoadBalancer",
    clusterIP: "10.0.0.1",
    externalIP: "34.102.136.180",
    ports: "80:30000/TCP",
    age: "2d",
  },
  {
    id: "s2",
    name: "backend-api",
    namespace: "default",
    type: "ClusterIP",
    clusterIP: "10.0.0.2",
    externalIP: "",
    ports: "8080:30001/TCP",
    age: "1d",
  },
  {
    id: "s3",
    name: "database",
    namespace: "db",
    type: "ClusterIP",
    clusterIP: "10.0.0.3",
    externalIP: "",
    ports: "5432:30002/TCP",
    age: "5d",
  },
]

export function KubernetesWorkloads() {
  const [selectedTab, setSelectedTab] = useState("deployments")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workloads</CardTitle>
        <CardDescription>Manage your Kubernetes workloads and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deployments" onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="pods">Pods</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="configmaps">ConfigMaps</TabsTrigger>
          </TabsList>

          <TabsContent value="deployments">
            <ScrollArea className="h-[400px]">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 text-sm font-medium border-b">
                  <div>Name</div>
                  <div>Namespace</div>
                  <div>Replicas</div>
                  <div>Status</div>
                  <div>Age</div>
                  <div className="text-right">Actions</div>
                </div>
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="grid grid-cols-6 p-3 text-sm border-b last:border-0">
                    <div className="font-medium">{deployment.name}</div>
                    <div>{deployment.namespace}</div>
                    <div>{deployment.replicas}</div>
                    <div>
                      <Badge variant={deployment.status === "Running" ? "default" : "destructive"}>
                        {deployment.status}
                      </Badge>
                    </div>
                    <div>{deployment.age}</div>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Terminal className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="pods">
            <ScrollArea className="h-[400px]">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 text-sm font-medium border-b">
                  <div>Name</div>
                  <div>Namespace</div>
                  <div>Status</div>
                  <div>Restarts</div>
                  <div>Age</div>
                  <div className="text-right">Actions</div>
                </div>
                {pods.map((pod) => (
                  <div key={pod.id} className="grid grid-cols-6 p-3 text-sm border-b last:border-0">
                    <div className="font-medium truncate">{pod.name}</div>
                    <div>{pod.namespace}</div>
                    <div>
                      <Badge
                        variant={
                          pod.status === "Running"
                            ? "default"
                            : pod.status === "CrashLoopBackOff"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {pod.status}
                      </Badge>
                    </div>
                    <div>{pod.restarts}</div>
                    <div>{pod.age}</div>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Terminal className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="services">
            <ScrollArea className="h-[400px]">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-3 text-sm font-medium border-b">
                  <div>Name</div>
                  <div>Namespace</div>
                  <div>Type</div>
                  <div>Cluster IP</div>
                  <div>External IP</div>
                  <div>Ports</div>
                  <div className="text-right">Actions</div>
                </div>
                {services.map((service) => (
                  <div key={service.id} className="grid grid-cols-7 p-3 text-sm border-b last:border-0">
                    <div className="font-medium">{service.name}</div>
                    <div>{service.namespace}</div>
                    <div>{service.type}</div>
                    <div>{service.clusterIP}</div>
                    <div>{service.externalIP || "-"}</div>
                    <div>{service.ports}</div>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="configmaps">
            <div className="flex items-center justify-center h-[400px] border rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No ConfigMaps found in the current namespace</p>
                <Button>Create ConfigMap</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
