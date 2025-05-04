"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Plus, Search, Trash2, Settings, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data
const volumes = [
  {
    id: "vol1",
    name: "data-volume",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/data-volume",
    size: "1.2 GB",
    created: "2 days ago",
  },
  {
    id: "vol2",
    name: "postgres-data",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/postgres-data",
    size: "4.5 GB",
    created: "1 week ago",
  },
  {
    id: "vol3",
    name: "nginx-config",
    driver: "local",
    mountpoint: "/var/lib/docker/volumes/nginx-config",
    size: "15 MB",
    created: "3 days ago",
  },
]

const networks = [
  {
    id: "net1",
    name: "bridge",
    driver: "bridge",
    scope: "local",
    subnet: "172.17.0.0/16",
    gateway: "172.17.0.1",
    created: "System default",
  },
  {
    id: "net2",
    name: "host",
    driver: "host",
    scope: "local",
    subnet: "N/A",
    gateway: "N/A",
    created: "System default",
  },
  {
    id: "net3",
    name: "app-network",
    driver: "bridge",
    scope: "local",
    subnet: "172.18.0.0/16",
    gateway: "172.18.0.1",
    created: "5 days ago",
  },
]

export function ContainerManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("volumes")
  const [isCreatingVolume, setIsCreatingVolume] = useState(false)
  const [isCreatingNetwork, setIsCreatingNetwork] = useState(false)
  const [volumeName, setVolumeName] = useState("")
  const [networkName, setNetworkName] = useState("")
  const [isActionInProgress, setIsActionInProgress] = useState<string | null>(null)

  const handleCreateVolume = () => {
    if (!volumeName) {
      toast({
        title: "Error",
        description: "Volume name is required",
        variant: "destructive",
      })
      return
    }

    setIsCreatingVolume(true)

    // Simulate volume creation
    setTimeout(() => {
      setIsCreatingVolume(false)
      setVolumeName("")
      toast({
        title: "Volume Created",
        description: `Volume ${volumeName} has been created successfully`,
      })
    }, 1500)
  }

  const handleCreateNetwork = () => {
    if (!networkName) {
      toast({
        title: "Error",
        description: "Network name is required",
        variant: "destructive",
      })
      return
    }

    setIsCreatingNetwork(true)

    // Simulate network creation
    setTimeout(() => {
      setIsCreatingNetwork(false)
      setNetworkName("")
      toast({
        title: "Network Created",
        description: `Network ${networkName} has been created successfully`,
      })
    }, 1500)
  }

  const handleDeleteResource = (id: string, type: string, name: string) => {
    setIsActionInProgress(id)

    // Simulate deletion
    setTimeout(() => {
      setIsActionInProgress(null)
      toast({
        title: `${type} Deleted`,
        description: `${type} ${name} has been deleted successfully`,
      })
    }, 1500)
  }

  const handleInspectResource = (id: string, type: string, name: string) => {
    toast({
      title: `Inspecting ${type}`,
      description: `Viewing details for ${name}`,
    })
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="volumes">Volumes</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="volumes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Docker Volumes</CardTitle>
                  <CardDescription>Manage persistent data storage for your containers</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search volumes..." className="pl-8 w-[200px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Create Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="volume-name">Volume Name</Label>
                          <Input
                            id="volume-name"
                            placeholder="e.g., my-data"
                            value={volumeName}
                            onChange={(e) => setVolumeName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="volume-driver">Driver</Label>
                          <Input id="volume-driver" placeholder="local" defaultValue="local" />
                        </div>
                        <Button onClick={handleCreateVolume} disabled={isCreatingVolume} className="w-full">
                          {isCreatingVolume ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Create Volume
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="font-medium">Volume Usage</div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Volumes are the preferred mechanism for persisting data generated by and used by Docker
                        containers.
                      </p>
                      <p className="mt-2">
                        Use volumes to store database data, configuration files, or any data that should persist beyond
                        the container lifecycle.
                      </p>
                    </div>
                    <div className="font-medium mt-4">Common Commands</div>
                    <div className="text-sm font-mono bg-muted p-2 rounded-md">
                      <div>docker volume create my-volume</div>
                      <div>docker volume ls</div>
                      <div>docker volume inspect my-volume</div>
                      <div>docker volume rm my-volume</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-3 text-sm font-medium border-b">
                    <div>Name</div>
                    <div>Driver</div>
                    <div>Mountpoint</div>
                    <div>Size</div>
                    <div>Created</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {volumes.map((volume) => (
                    <div key={volume.id} className="grid grid-cols-6 p-3 text-sm border-b last:border-0">
                      <div className="font-medium">{volume.name}</div>
                      <div>{volume.driver}</div>
                      <div className="truncate" title={volume.mountpoint}>
                        {volume.mountpoint}
                      </div>
                      <div>{volume.size}</div>
                      <div>{volume.created}</div>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleInspectResource(volume.id, "Volume", volume.name)}
                        >
                          <Settings className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleDeleteResource(volume.id, "Volume", volume.name)}
                          disabled={isActionInProgress === volume.id}
                        >
                          {isActionInProgress === volume.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Docker Networks</CardTitle>
                  <CardDescription>Manage container networking and communication</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search networks..." className="pl-8 w-[200px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Create Network</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="network-name">Network Name</Label>
                          <Input
                            id="network-name"
                            placeholder="e.g., app-network"
                            value={networkName}
                            onChange={(e) => setNetworkName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="network-driver">Driver</Label>
                          <Input id="network-driver" placeholder="bridge" defaultValue="bridge" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="network-subnet">Subnet (optional)</Label>
                          <Input id="network-subnet" placeholder="e.g., 172.20.0.0/16" />
                        </div>
                        <Button onClick={handleCreateNetwork} disabled={isCreatingNetwork} className="w-full">
                          {isCreatingNetwork ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Create Network
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="font-medium">Network Types</div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">bridge:</span> Default network driver. Good for containers running
                        on the same Docker host.
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">host:</span> Removes network isolation, using the host's
                        networking directly.
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">overlay:</span> Connect multiple Docker daemons and enable Swarm
                        services to communicate.
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">macvlan:</span> Assign a MAC address to a container, making it
                        appear as a physical device.
                      </p>
                    </div>
                    <div className="font-medium mt-4">Common Commands</div>
                    <div className="text-sm font-mono bg-muted p-2 rounded-md">
                      <div>docker network create my-network</div>
                      <div>docker network ls</div>
                      <div>docker network inspect my-network</div>
                      <div>docker network rm my-network</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-7 p-3 text-sm font-medium border-b">
                    <div>Name</div>
                    <div>Driver</div>
                    <div>Scope</div>
                    <div>Subnet</div>
                    <div>Gateway</div>
                    <div>Created</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {networks.map((network) => (
                    <div key={network.id} className="grid grid-cols-7 p-3 text-sm border-b last:border-0">
                      <div className="font-medium">{network.name}</div>
                      <div>{network.driver}</div>
                      <div>{network.scope}</div>
                      <div>{network.subnet}</div>
                      <div>{network.gateway}</div>
                      <div>{network.created}</div>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleInspectResource(network.id, "Network", network.name)}
                        >
                          <Settings className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleDeleteResource(network.id, "Network", network.name)}
                          disabled={
                            isActionInProgress === network.id || network.name === "bridge" || network.name === "host"
                          }
                        >
                          {isActionInProgress === network.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
