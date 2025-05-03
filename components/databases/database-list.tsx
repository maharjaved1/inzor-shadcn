"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DatabaseIcon, ExternalLink, RefreshCw, Settings, Trash2, Play, Square, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { DatabaseQuery } from "@/components/databases/database-query"

const databases = [
  {
    id: "db1",
    name: "production-db",
    type: "PostgreSQL",
    version: "14",
    status: "online",
    size: "10GB",
    connections: 24,
    cpu: 35,
    memory: 42,
    storage: 68,
    region: "us-west",
  },
  {
    id: "db2",
    name: "staging-db",
    type: "PostgreSQL",
    version: "14",
    status: "online",
    size: "5GB",
    connections: 8,
    cpu: 15,
    memory: 22,
    storage: 45,
    region: "us-east",
  },
  {
    id: "db3",
    name: "analytics-db",
    type: "MySQL",
    version: "8.0",
    status: "online",
    size: "20GB",
    connections: 12,
    cpu: 55,
    memory: 60,
    storage: 72,
    region: "eu-west",
  },
  {
    id: "db4",
    name: "test-db",
    type: "MongoDB",
    version: "5.0",
    status: "offline",
    size: "2GB",
    connections: 0,
    cpu: 0,
    memory: 0,
    storage: 25,
    region: "us-west",
  },
]

const backups = [
  {
    id: "bk1",
    database: "production-db",
    created: "2023-05-01 12:30:45",
    size: "9.8GB",
    status: "completed",
    retention: "7 days",
  },
  {
    id: "bk2",
    database: "production-db",
    created: "2023-04-30 12:30:45",
    size: "9.7GB",
    status: "completed",
    retention: "7 days",
  },
  {
    id: "bk3",
    database: "staging-db",
    created: "2023-05-01 06:15:22",
    size: "4.9GB",
    status: "completed",
    retention: "3 days",
  },
  {
    id: "bk4",
    database: "analytics-db",
    created: "2023-05-01 00:00:12",
    size: "19.5GB",
    status: "completed",
    retention: "7 days",
  },
]

export function DatabaseList() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const [showQuery, setShowQuery] = useState(false)

  return (
    <Tabs defaultValue="instances" className="space-y-4">
      <TabsList>
        <TabsTrigger value="instances">Instances</TabsTrigger>
        <TabsTrigger value="backups">Backups</TabsTrigger>
        <TabsTrigger value="connections">Connections</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
      </TabsList>
      <TabsContent value="instances" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {databases.map((database) => (
            <Card
              key={database.id}
              className={`cursor-pointer ${selectedDatabase === database.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedDatabase(database.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{database.name}</CardTitle>
                    <CardDescription>
                      {database.type} {database.version}
                    </CardDescription>
                  </div>
                  <Badge variant={database.status === "online" ? "default" : "secondary"}>{database.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{database.region}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{database.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Connections:</span>
                    <span>{database.connections}</span>
                  </div>
                  {database.status === "online" && (
                    <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU:</span>
                          <span>{database.cpu}%</span>
                        </div>
                        <Progress value={database.cpu} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Memory:</span>
                          <span>{database.memory}%</span>
                        </div>
                        <Progress value={database.memory} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Storage:</span>
                          <span>{database.storage}%</span>
                        </div>
                        <Progress
                          value={database.storage}
                          className="h-1"
                          indicatorClassName={database.storage > 80 ? "bg-destructive" : undefined}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between w-full">
                  {database.status === "online" ? (
                    <Button variant="outline" size="sm">
                      <Square className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowQuery(true)
                      }}
                    >
                      <DatabaseIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showQuery && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Database Query</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowQuery(false)}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {databases.find((db) => db.id === selectedDatabase)?.name || "Select a database"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DatabaseQuery />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="backups" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>Manage your database backups</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Create Backup
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 p-3 text-sm font-medium border-b">
                <div>Database</div>
                <div>Created</div>
                <div>Size</div>
                <div>Status</div>
                <div>Retention</div>
                <div className="text-right">Actions</div>
              </div>
              {backups.map((backup) => (
                <div key={backup.id} className="grid grid-cols-6 p-3 text-sm border-b last:border-0">
                  <div>{backup.database}</div>
                  <div>{backup.created}</div>
                  <div>{backup.size}</div>
                  <div>
                    <Badge variant="outline" className="capitalize">
                      {backup.status}
                    </Badge>
                  </div>
                  <div>{backup.retention}</div>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="connections" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Connections</CardTitle>
            <CardDescription>Manage connection strings and access</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Connection management content will appear here</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="monitoring" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Monitoring</CardTitle>
            <CardDescription>Monitor database performance and health</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitoring content will appear here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
