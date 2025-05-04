import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export function ContainerHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Containers</h1>
        <p className="text-muted-foreground">Manage your Docker containers and resources</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search containers..." className="w-full sm:w-[300px] pl-8" />
        </div>
        <Button asChild>
          <Link href="/dashboard/containers/create">
            <Plus className="mr-2 h-4 w-4" />
            New Container
          </Link>
        </Button>
      </div>
    </div>
  )
}
