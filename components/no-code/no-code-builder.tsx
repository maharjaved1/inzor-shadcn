"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowRight,
  Code,
  Database,
  Download,
  Eye,
  Layout,
  Layers,
  Play,
  Plus,
  Save,
  Settings,
  Trash2,
} from "lucide-react"

export function NoCodeBuilder() {
  const [activeTab, setActiveTab] = useState("design")

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Web Dashboard</CardTitle>
            <CardDescription>Interactive dashboard with charts and tables</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-1" />
              Deploy
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="design" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <div className="border-b px-4">
            <TabsList className="mb-0 justify-start">
              <TabsTrigger value="design">
                <Layout className="h-4 w-4 mr-2" />
                Design
              </TabsTrigger>
              <TabsTrigger value="data">
                <Database className="h-4 w-4 mr-2" />
                Data
              </TabsTrigger>
              <TabsTrigger value="logic">
                <Code className="h-4 w-4 mr-2" />
                Logic
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 flex">
            <TabsContent value="design" className="flex-1 flex m-0 border-0">
              <div className="w-64 border-r p-4">
                <h3 className="font-medium mb-3">Components</h3>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Header</div>
                      <div className="text-xs text-muted-foreground">Page header with navigation</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Card</div>
                      <div className="text-xs text-muted-foreground">Content container with header</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Chart</div>
                      <div className="text-xs text-muted-foreground">Data visualization component</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Table</div>
                      <div className="text-xs text-muted-foreground">Tabular data display</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Form</div>
                      <div className="text-xs text-muted-foreground">Input form with validation</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Button</div>
                      <div className="text-xs text-muted-foreground">Clickable action button</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Image</div>
                      <div className="text-xs text-muted-foreground">Image display component</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted">
                      <div className="font-medium text-sm">Navigation</div>
                      <div className="text-xs text-muted-foreground">Site navigation menu</div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="flex-1 p-4 bg-muted/30 flex flex-col">
                <div className="bg-background border rounded-md h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Design Your Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop components from the sidebar to build your dashboard
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Component
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="flex-1 m-0 border-0 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                  <CardDescription>Connect to databases and APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">PostgreSQL Database</h3>
                          <p className="text-sm text-muted-foreground">Connected to production-db</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">REST API</h3>
                          <p className="text-sm text-muted-foreground">Connected to https://api.example.com</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Data Source
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logic" className="flex-1 m-0 border-0 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Logic</CardTitle>
                  <CardDescription>Define workflows and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Authentication Flow</h3>
                          <p className="text-sm text-muted-foreground">User login and registration</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Data Fetching</h3>
                          <p className="text-sm text-muted-foreground">Load and display dashboard data</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 m-0 border-0 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Settings</CardTitle>
                  <CardDescription>Configure your application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input id="project-name" defaultValue="Web Dashboard" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" defaultValue="Interactive dashboard with charts and tables" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deployment">Deployment Target</Label>
                      <Input id="deployment" defaultValue="https://dashboard.example.com" />
                    </div>
                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-1" />
                        Export Project
                      </Button>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t">
        <div className="flex justify-between w-full">
          <div className="text-sm text-muted-foreground">Last saved: 5 minutes ago</div>
          <div className="text-sm text-muted-foreground">Version: 1.0.3</div>
        </div>
      </CardFooter>
    </Card>
  )
}
