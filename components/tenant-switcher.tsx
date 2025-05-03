"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Tenant = {
  label: string
  value: string
}

const tenants = [
  {
    label: "Personal Account",
    value: "personal",
  },
  {
    label: "Acme Inc",
    value: "acme",
  },
  {
    label: "Monsters Inc",
    value: "monsters",
  },
]

type TenantSwitcherProps = {
  currentTenant: string
  setCurrentTenant: (tenant: string) => void
}

export function TenantSwitcher({ currentTenant, setCurrentTenant }: TenantSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  const selectedTenant = tenants.find((tenant) => tenant.value === currentTenant)

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a tenant"
            className="w-[200px] justify-between"
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={selectedTenant?.label} />
              <AvatarFallback>{selectedTenant?.label.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {selectedTenant?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search tenant..." />
              <CommandEmpty>No tenant found.</CommandEmpty>
              <CommandGroup heading="Tenants">
                {tenants.map((tenant) => (
                  <CommandItem
                    key={tenant.value}
                    onSelect={() => {
                      setCurrentTenant(tenant.value)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={tenant.label} />
                      <AvatarFallback>{tenant.label.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {tenant.label}
                    <CheckIcon
                      className={cn("ml-auto h-4 w-4", currentTenant === tenant.value ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowNewTeamDialog(true)
                  }}
                >
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Create Tenant
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create tenant</DialogTitle>
          <DialogDescription>Add a new tenant to manage products and customers.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tenant name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowNewTeamDialog(false)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
