"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, TableIcon, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatabaseHeader } from "@/components/databases/database-header"
import { DatabaseQuery } from "@/components/databases/database-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// Mock data for database
const mockDatabase = {
  id: "1",
  name: "production-db",
  type: "PostgreSQL",
  version: "14.5",
  status: "Running",
  host: "db.example.com",
  port: 5432,
  size: "10GB",
  tables: [
    { name: "users", rows: 1250, size: "2.5MB" },
    { name: "products", rows: 5432, size: "8.7MB" },
    { name: "orders", rows: 10876, size: "15.2MB" },
    { name: "categories", rows: 48, size: "0.3MB" },
    { name: "reviews", rows: 8765, size: "12.1MB" },
  ],
}

export default function DatabaseDetailPage() {
  const params = useParams()
  const [database, setDatabase] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch database details
    const fetchDatabase = async () => {
      setLoading(true)
      // In a real app, you would fetch the database details from an API
      // For now, we'll use mock data
      setTimeout(() => {
        setDatabase(mockDatabase)
        setLoading(false)
      }, 1000)
    }

    fetchDatabase()
  }, [params.id])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Database refreshed",
        description: "The latest database information has been fetched",
      })
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 p-8">
      <DatabaseHeader title={`Database: ${database.name}`} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Status</CardTitle>
            <CardDescription>Current status of the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${database.status === "Running" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span>{database.status}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Type</CardTitle>
            <CardDescription>Database engine</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {database.type} {database.version}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Connection</CardTitle>
            <CardDescription>Host and port</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>Host: {database.host}</p>
              <p>Port: {database.port}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tables" className="w-full">
        <TabsList>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="query">Query Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="tables">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <TableIcon className="mr-2 h-4 w-4" />
                  Tables
                </CardTitle>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Tables in {database.name} database</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {database.tables.map((table: any) => (
                    <TableRow key={table.name}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.rows.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="query">
          <DatabaseQuery databaseName={database.name} databaseType={database.type} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Backup</Button>
        <Button variant="outline">Metrics</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}
