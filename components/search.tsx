"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function Search() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative w-full md:w-auto">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full md:w-[200px] pl-8"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <SearchIcon className="mr-2 h-4 w-4" />
              <span>Search Containers</span>
            </CommandItem>
            <CommandItem>
              <SearchIcon className="mr-2 h-4 w-4" />
              <span>Search Kubernetes</span>
            </CommandItem>
            <CommandItem>
              <SearchIcon className="mr-2 h-4 w-4" />
              <span>Search Databases</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            <CommandItem>
              <span>Create Container</span>
            </CommandItem>
            <CommandItem>
              <span>Deploy Application</span>
            </CommandItem>
            <CommandItem>
              <span>View Logs</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
