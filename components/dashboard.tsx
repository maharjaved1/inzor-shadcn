"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Terminal } from "./terminal"
import { DockerPanel } from "./docker-panel"
import { Playground } from "./playground"
import { TenantSwitcher } from "./tenant-switcher"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "@/hooks/use-toast"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Database, GitBranch, Home, LayoutDashboard, Layers, Settings, Users } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const isMobile = useMobile()
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentTenant, setCurrentTenant] = useState("personal")
  const [isDbAvailable, setIsDbAvailable] = useState(false)
  const [isDockerRunning, setIsDockerRunning] = useState(false)

  // Simulate checking for Docker and database availability
  useEffect(() => {
    // Simulate Docker check
    const checkDocker = setTimeout(() => {
      setIsDockerRunning(true)
      toast({
        title: "Docker Connected",
        description: "Docker daemon is now running",
      })
    }, 2000)

    // Simulate database check
    const checkDb = setTimeout(() => {
      setIsDbAvailable(true)
      toast({
        title: "Database Connected",
        description: "Database connection established",
      })
    }, 3500)

    return () => {
      clearTimeout(checkDocker)
      clearTimeout(checkDb)
    }
  }, [])

  const executeCommand = (command: string) => {
    setCommandHistory((prev) => [...prev, command])

    // Simulate command execution
    if (command.startsWith("docker") && !isDockerRunning) {
      setCommandHistory((prev) => [
        ...prev,
        "Error: Docker daemon is not running. Please start Docker Desktop or the Docker service.",
      ])
      return
    }

    // Database-related commands
    if (command.includes("database") && !isDbAvailable) {
      setCommandHistory((prev) => [...prev, "Error: Database connection failed. Please check your configuration."])
      return
    }

    // Simulate successful command execution
    if (command === "docker ps") {
      setCommandHistory((prev) => [
        ...prev,
        "CONTAINER ID   IMAGE          COMMAND        CREATED       STATUS       PORTS                    NAMES",
        'abc123def456   nginx:latest   "nginx -g…"   2 hours ago   Up 2 hours   0.0.0.0:8080->80/tcp     web-server',
        'def456abc789   postgres:14    "postgres"     3 hours ago   Up 3 hours   0.0.0.0:5432->5432/tcp   db',
      ])
    } else if (command === "docker images") {
      setCommandHistory((prev) => [
        ...prev,
        "REPOSITORY   TAG       IMAGE ID       CREATED        SIZE",
        "nginx        latest    a6bd71f48f68   2 days ago     142MB",
        "postgres     14        a307d5eaab76   1 week ago     374MB",
        "node         16        b51c1ee6a9fe   2 weeks ago    852MB",
      ])
    } else if (command === "git status") {
      setCommandHistory((prev) => [
        ...prev,
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "nothing to commit, working tree clean",
      ])
    } else {
      // Generic response for other commands
      setCommandHistory((prev) => [...prev, `Executed: ${command}`, "Command completed successfully."])
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <MainNav />
          <div className="ml-auto flex items-center gap-4">
            <TenantSwitcher currentTenant={currentTenant} setCurrentTenant={setCurrentTenant} />
            <UserNav />
          </div>
        </header>
        <div className="flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex h-12 items-center px-4 font-semibold">Docker Dashboard</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard")}>
                    <a href="#">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard")}>
                    <a href="#">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard/containers")}>
                    <a href="#">
                      <Layers className="h-4 w-4" />
                      <span>Containers</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard/github")}>
                    <a href="#">
                      <GitBranch className="h-4 w-4" />
                      <span>Git</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard/databases")}>
                    <a href="#">
                      <Database className="h-4 w-4" />
                      <span>Databases</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard/kubernetes")}>
                    <a href="#">
                      <Users className="h-4 w-4" />
                      <span>Kubernetes</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => handleNavigation("/dashboard/settings")}>
                    <a href="#">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="flex flex-col h-[calc(100vh-4rem)]">
              <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight">Docker Management Dashboard</h1>
                <p className="text-muted-foreground">
                  Current tenant: <span className="font-medium">{currentTenant}</span>
                </p>
              </div>
              <Separator />
              <div className="flex-1 p-6">
                <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
                  <ResizablePanel defaultSize={60}>
                    <Tabs defaultValue="playground">
                      <div className="flex justify-between items-center mb-4">
                        <TabsList>
                          <TabsTrigger value="playground">Playground</TabsTrigger>
                          <TabsTrigger value="docker">Docker</TabsTrigger>
                          <TabsTrigger value="git">Git</TabsTrigger>
                          <TabsTrigger
                            value="database"
                            disabled={!isDbAvailable}
                            className={!isDbAvailable ? "cursor-not-allowed" : ""}
                          >
                            Database {!isDbAvailable && "(Connecting...)"}
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="playground" className="h-[calc(100vh-16rem)]">
                        <Playground isDockerRunning={isDockerRunning} />
                      </TabsContent>
                      <TabsContent value="docker" className="h-[calc(100vh-16rem)]">
                        <DockerPanel executeCommand={executeCommand} isDockerRunning={isDockerRunning} />
                      </TabsContent>
                      <TabsContent value="git" className="h-[calc(100vh-16rem)]">
                        <div className="rounded-md border h-full p-4">
                          <h3 className="text-lg font-medium mb-4">Git Repository</h3>
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-md border p-4">
                                <h4 className="font-medium mb-2">Clone Repository</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Clone a Git repository to your workspace
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
                                    onClick={() => executeCommand("git clone https://github.com/example/repo.git")}
                                  >
                                    Clone
                                  </button>
                                </div>
                              </div>
                              <div className="rounded-md border p-4">
                                <h4 className="font-medium mb-2">Pull Changes</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Pull the latest changes from the remote
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
                                    onClick={() => executeCommand("git pull")}
                                  >
                                    Pull
                                  </button>
                                  <button
                                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-sm"
                                    onClick={() => executeCommand("git fetch")}
                                  >
                                    Fetch
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-md border p-4">
                              <h4 className="font-medium mb-2">Branch Management</h4>
                              <p className="text-sm text-muted-foreground mb-4">Manage your Git branches</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="database" className="h-[calc(100vh-16rem)]">
                        <div className="rounded-md border h-full p-4">
                          <h3 className="text-lg font-medium mb-4">Database Management</h3>
                          <p className="text-muted-foreground">Manage your databases</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </ResizablePanel>
                  <ResizableHandle orientation={isMobile ? "horizontal" : "vertical"} />
                  <ResizablePanel defaultSize={40}>
                    <Terminal commandHistory={commandHistory} executeCommand={executeCommand} />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
