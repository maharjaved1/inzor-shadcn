import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export function DatabaseHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Databases</h1>
        <p className="text-muted-foreground">Manage your database instances and connections</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search databases..." className="w-full sm:w-[300px] pl-8" />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Database
        </Button>
      </div>
    </div>
  )
}
