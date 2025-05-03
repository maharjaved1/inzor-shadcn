"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, Settings, Terminal, Trash2, Plus } from "lucide-react"

const clusters = [
  {
    id: "cluster-1",
    name: "production-cluster",
    version: "1.26.3",
    status: "healthy",
    nodes: 5,
    cpu: 68,
    memory: 72,
    storage: 45,
    region: "us-west",
  },
  {
    id: "cluster-2",
    name: "staging-cluster",
    version: "1.25.9",
    status: "healthy",
    nodes: 3,
    cpu: 42,
    memory: 38,
    storage: 30,
    region: "us-east",
  },
  {
    id: "cluster-3",
    name: "development-cluster",
    version: "1.26.3",
    status: "warning",
    nodes: 2,
    cpu: 85,
    memory: 65,
    storage: 50,
    region: "eu-west",
  },
]

export function KubernetesClusters() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Clusters</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Cluster
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clusters.map((cluster) => (
          <Card key={cluster.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{cluster.name}</CardTitle>
                  <CardDescription>Version: {cluster.version}</CardDescription>
                </div>
                <Badge variant={cluster.status === "healthy" ? "default" : "destructive"}>{cluster.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Region:</span>
                  <span>{cluster.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nodes:</span>
                  <span>{cluster.nodes}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU:</span>
                    <span>{cluster.cpu}%</span>
                  </div>
                  <Progress
                    value={cluster.cpu}
                    className="h-1"
                    indicatorClassName={cluster.cpu > 80 ? "bg-destructive" : undefined}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory:</span>
                    <span>{cluster.memory}%</span>
                  </div>
                  <Progress
                    value={cluster.memory}
                    className="h-1"
                    indicatorClassName={cluster.memory > 80 ? "bg-destructive" : undefined}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage:</span>
                    <span>{cluster.storage}%</span>
                  </div>
                  <Progress
                    value={cluster.storage}
                    className="h-1"
                    indicatorClassName={cluster.storage > 80 ? "bg-destructive" : undefined}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm">
                  <Terminal className="h-4 w-4 mr-1" />
                  Console
                </Button>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
