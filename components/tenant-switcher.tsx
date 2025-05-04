"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronsUpDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TenantSwitcherProps {
  currentTenant: string
  setCurrentTenant: (tenant: string) => void
}

export function TenantSwitcher({ currentTenant, setCurrentTenant }: TenantSwitcherProps) {
  const [open, setOpen] = useState(false)

  const tenants = [
    { id: "personal", name: "Personal" },
    { id: "team-a", name: "Team A" },
    { id: "team-b", name: "Team B" },
    { id: "acme-corp", name: "Acme Corp" },
  ]

  const handleTenantChange = (tenantId: string) => {
    setCurrentTenant(tenantId)
    setOpen(false)

    const tenant = tenants.find((t) => t.id === tenantId)
    if (tenant) {
      toast({
        title: "Tenant Changed",
        description: `Switched to ${tenant.name} tenant`,
      })
    }
  }

  const currentTenantName = tenants.find((t) => t.id === currentTenant)?.name || "Personal"

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          {currentTenantName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuLabel>Switch Tenant</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tenants.map((tenant) => (
          <DropdownMenuItem
            key={tenant.id}
            onClick={() => handleTenantChange(tenant.id)}
            className="flex items-center justify-between"
          >
            {tenant.name}
            {currentTenant === tenant.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => toast({ title: "Create Tenant", description: "Opening tenant creation form" })}
        >
          Create New Tenant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
