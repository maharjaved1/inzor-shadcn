"use client"

import { Button } from "@/components/ui/button"
import { Database, GitBranch, Layers, Play, RefreshCw, Wand2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export function QuickActions() {
  const router = useRouter()

  const handleNewContainer = () => {
    router.push("/dashboard/containers/create")
  }

  const handleCreateDatabase = () => {
    router.push("/dashboard/databases")
    toast({
      title: "Database Creation",
      description: "Redirecting to database creation page",
    })
  }

  const handlePullRepository = () => {
    toast({
      title: "Repository Pull",
      description: "Pulling latest changes from repository",
    })
  }

  const handleDeployApp = () => {
    toast({
      title: "Deployment Started",
      description: "Your application is being deployed",
    })
  }

  const handleAIAssistant = () => {
    router.push("/dashboard/ai-playground")
  }

  const handleRefreshStatus = () => {
    toast({
      title: "Refreshing Status",
      description: "Updating system status information",
    })
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center" onClick={handleNewContainer}>
        <Layers className="h-5 w-5 mb-2" />
        <span>New Container</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col h-24 items-center justify-center"
        onClick={handleCreateDatabase}
      >
        <Database className="h-5 w-5 mb-2" />
        <span>Create Database</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col h-24 items-center justify-center"
        onClick={handlePullRepository}
      >
        <GitBranch className="h-5 w-5 mb-2" />
        <span>Pull Repository</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center" onClick={handleDeployApp}>
        <Play className="h-5 w-5 mb-2" />
        <span>Deploy App</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center" onClick={handleAIAssistant}>
        <Wand2 className="h-5 w-5 mb-2" />
        <span>AI Assistant</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col h-24 items-center justify-center"
        onClick={handleRefreshStatus}
      >
        <RefreshCw className="h-5 w-5 mb-2" />
        <span>Refresh Status</span>
      </Button>
    </div>
  )
}
