"use client"

import type React from "react"

import Link from "next/link"
import { BarChart, Database, Github, Home, Layers, LogIn, Settings, Terminal, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  pathname: string
}

export function SidebarNav({ className, pathname, ...props }: SidebarNavProps) {
  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/dashboard/containers",
      icon: Layers,
      title: "Containers",
    },
    {
      href: "/dashboard/kubernetes",
      icon: BarChart,
      title: "Kubernetes",
    },
    {
      href: "/dashboard/databases",
      icon: Database,
      title: "Databases",
    },
    {
      href: "/dashboard/github",
      icon: Github,
      title: "GitHub",
    },
    {
      href: "/dashboard/ai-playground",
      icon: Wand2,
      title: "AI Playground",
    },
    {
      href: "/dashboard/logs",
      icon: Terminal,
      title: "Logs",
    },
    {
      href: "/dashboard/no-code",
      icon: LogIn,
      title: "No-Code Builder",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <nav className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={pathname === route.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === route.href ? "bg-secondary" : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
