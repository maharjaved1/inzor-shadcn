"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { RefreshCw, Terminal, Trash2, Plus, Edit, Check, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleRefresh = (id: string) => {
    setIsRefreshing(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Resource information has been updated",
      })
    }, 1500)
  }

  const handleDelete = (id: string, type: string, name: string) => {
    setDeleteTarget(id)
    setIsDeleting(true)

    // Simulate deletion
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteTarget(null)

      setSuccessMessage(`${type} "${name}" has been deleted successfully`)
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Deleted",
        description: `${type} "${name}" has been deleted`,
      })
    }, 2000)
  }

  const handleOpenTerminal = (id: string, name: string) => {
    setSelectedItem(name)
    setShowTerminal(true)

    toast({
      title: "Terminal Opened",
      description: `Connected to ${name}`,
    })
  }

  const handleCloseTerminal = () => {
    setShowTerminal(false)
    setSelectedItem(null)
  }

  const handleScaleDeployment = (id: string, name: string) => {
    toast({
      title: "Deployment Scaled",
      description: `${name} has been scaled to 3 replicas`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workloads</CardTitle>
        <CardDescription>Manage your Kubernetes workloads and resources</CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400">
            <Check className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="deployments" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="pods">Pods</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="configmaps">ConfigMaps</TabsTrigger>
          </TabsList>

          <TabsContent value="deployments">
            <div className="flex justify-end mb-4">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Deployment
              </Button>
            </div>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleOpenTerminal(deployment.id, deployment.name)}
                      >
                        <Terminal className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleScaleDeployment(deployment.id, deployment.name)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleRefresh(deployment.id)}
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleDelete(deployment.id, "Deployment", deployment.name)}
                        disabled={isDeleting && deleteTarget === deployment.id}
                      >
                        {isDeleting && deleteTarget === deployment.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="pods">
            <div className="flex justify-end mb-4">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Pod
              </Button>
            </div>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleOpenTerminal(pod.id, pod.name)}
                      >
                        <Terminal className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleRefresh(pod.id)}
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleDelete(pod.id, "Pod", pod.name)}
                        disabled={isDeleting && deleteTarget === pod.id}
                      >
                        {isDeleting && deleteTarget === pod.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="services">
            <div className="flex justify-end mb-4">
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Service
              </Button>
            </div>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleRefresh(service.id)}
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleDelete(service.id, "Service", service.name)}
                        disabled={isDeleting && deleteTarget === service.id}
                      >
                        {isDeleting && deleteTarget === service.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
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

        {showTerminal && (
          <Dialog open={showTerminal} onOpenChange={handleCloseTerminal}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Terminal: {selectedItem}</DialogTitle>
                <DialogDescription>Connected to container. Type 'exit' to close the terminal.</DialogDescription>
              </DialogHeader>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-[300px] overflow-auto">
                <div>$ kubectl exec -it {selectedItem} -- /bin/bash</div>
                <div>root@{selectedItem}:/# ls</div>
                <div>app bin boot dev etc home lib media mnt opt proc root run sbin srv sys tmp usr var</div>
                <div>root@{selectedItem}:/# ps aux</div>
                <div>USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND</div>
                <div>root 1 0.0 0.1 2388 1664 ? Ss 00:00 0:00 /bin/bash</div>
                <div>root 20 0.0 0.1 2388 1664 ? Ss 00:01 0:00 /bin/bash</div>
                <div>root 35 0.0 0.1 4368 3008 ? R+ 00:03 0:00 ps aux</div>
                <div>root@{selectedItem}:/# _</div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseTerminal}>
                  Close Terminal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
