import { Button } from "@/components/ui/button"
import { Database, GitBranch, Layers, Play, RefreshCw, Wand2 } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <Layers className="h-5 w-5 mb-2" />
        <span>New Container</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <Database className="h-5 w-5 mb-2" />
        <span>Create Database</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <GitBranch className="h-5 w-5 mb-2" />
        <span>Pull Repository</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <Play className="h-5 w-5 mb-2" />
        <span>Deploy App</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <Wand2 className="h-5 w-5 mb-2" />
        <span>AI Assistant</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
        <RefreshCw className="h-5 w-5 mb-2" />
        <span>Refresh Status</span>
      </Button>
    </div>
  )
}
