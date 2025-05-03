"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/containers"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/containers" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Containers
      </Link>
      <Link
        href="/dashboard/kubernetes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/kubernetes" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Kubernetes
      </Link>
      <Link
        href="/dashboard/databases"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/databases" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Databases
      </Link>
      <Link
        href="/dashboard/github"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/github" ? "text-primary" : "text-muted-foreground",
        )}
      >
        GitHub
      </Link>
    </nav>
  )
}
