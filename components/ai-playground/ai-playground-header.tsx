import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Wand2 } from "lucide-react"

export function AIPlaygroundHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Playground</h1>
        <p className="text-muted-foreground">Experiment with AI models and create applications</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search models..." className="w-full sm:w-[300px] pl-8" />
        </div>
        <Button>
          <Wand2 className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  )
}
