"use client"

import type React from "react"

import { useState } from "react"
import { Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function DatabaseCreate() {
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCreateDatabase = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate database creation
    setTimeout(() => {
      setIsCreating(false)
      toast({
        title: "Database created",
        description: "Your database has been successfully created.",
      })
      router.push("/dashboard/databases")
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Database className="h-5 w-5" />
          Create Database
        </CardTitle>
        <CardDescription>Configure and deploy a new database instance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <form onSubmit={handleCreateDatabase}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Database Name</Label>
                    <Input id="name" placeholder="my-database" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engine">Database Engine</Label>
                    <Select defaultValue="postgresql">
                      <SelectTrigger id="engine">
                        <SelectValue placeholder="Select engine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="redis">Redis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Select defaultValue="14">
                      <SelectTrigger id="version">
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14">PostgreSQL 14</SelectItem>
                        <SelectItem value="13">PostgreSQL 13</SelectItem>
                        <SelectItem value="12">PostgreSQL 12</SelectItem>
                        <SelectItem value="11">PostgreSQL 11</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Instance Size</Label>
                    <Select defaultValue="small">
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="micro">Micro (1 vCPU, 1GB RAM)</SelectItem>
                        <SelectItem value="small">Small (2 vCPU, 2GB RAM)</SelectItem>
                        <SelectItem value="medium">Medium (4 vCPU, 8GB RAM)</SelectItem>
                        <SelectItem value="large">Large (8 vCPU, 16GB RAM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input id="storage" type="number" min="10" defaultValue="20" required />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="backup" defaultChecked />
                  <Label htmlFor="backup">Enable automated backups</Label>
                </div>

                <div className="pt-4">
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Database"}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="connection">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Host</Label>
                  <Input id="host" placeholder="db.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" placeholder="5432" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="connection-string">Connection String</Label>
                <Input id="connection-string" placeholder="postgresql://user:password@db.example.com:5432/mydb" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="public-access" />
                <Label htmlFor="public-access">Allow public access</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Admin Username</Label>
                  <Input id="username" placeholder="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="ssl" defaultChecked />
                <Label htmlFor="ssl">Require SSL connections</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="encryption" defaultChecked />
                <Label htmlFor="encryption">Enable data encryption</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parameters">Database Parameters</Label>
                <Input id="parameters" placeholder="max_connections=100,shared_buffers=256MB" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="high-availability" />
                <Label htmlFor="high-availability">Enable high availability</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="monitoring" defaultChecked />
                <Label htmlFor="monitoring">Enable enhanced monitoring</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="auto-scaling" />
                <Label htmlFor="auto-scaling">Enable auto-scaling</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
