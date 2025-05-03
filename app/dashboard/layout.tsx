"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "@/components/search"
import { Notifications } from "@/components/notifications"
import { TeamSwitcher } from "@/components/team-switcher"
import { SidebarNav } from "@/components/sidebar-nav"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Show welcome toast on first load
    toast({
      title: "Welcome to CloudPlatform",
      description: "Your complete DevOps solution is ready.",
    })
  }, [toast])

  // Prevent hydration errors
  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <TeamSwitcher />
        <MainNav />
        <div className="ml-auto flex items-center gap-4">
          <Search />
          <Notifications />
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[240px] flex-col border-r bg-background md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6" />
              <span className="font-semibold">CloudPlatform</span>
            </div>
          </div>
          <SidebarNav pathname={pathname} />
        </aside>
        <main className="flex-1 overflow-auto">
          <Suspense>{children}</Suspense>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
