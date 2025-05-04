"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { RefreshCw } from "lucide-react"

// Mock data for charts
const containerData = [
  { name: "Mon", running: 12, stopped: 3, total: 15 },
  { name: "Tue", running: 15, stopped: 2, total: 17 },
  { name: "Wed", running: 14, stopped: 4, total: 18 },
  { name: "Thu", running: 17, stopped: 3, total: 20 },
  { name: "Fri", running: 16, stopped: 5, total: 21 },
  { name: "Sat", running: 14, stopped: 6, total: 20 },
  { name: "Sun", running: 13, stopped: 4, total: 17 },
]

const resourceUsageData = [
  { name: "Mon", cpu: 45, memory: 60, network: 30 },
  { name: "Tue", cpu: 55, memory: 65, network: 40 },
  { name: "Wed", cpu: 65, memory: 70, network: 45 },
  { name: "Thu", cpu: 70, memory: 75, network: 50 },
  { name: "Fri", cpu: 60, memory: 80, network: 55 },
  { name: "Sat", cpu: 50, memory: 70, network: 45 },
  { name: "Sun", cpu: 40, memory: 60, network: 35 },
]

const deploymentData = [
  { name: "Jan", successful: 24, failed: 2 },
  { name: "Feb", successful: 28, failed: 1 },
  { name: "Mar", successful: 26, failed: 3 },
  { name: "Apr", successful: 30, failed: 2 },
  { name: "May", successful: 32, failed: 0 },
  { name: "Jun", successful: 35, failed: 1 },
]

const serviceHealthData = [
  { name: "API Gateway", value: 95 },
  { name: "Auth Service", value: 98 },
  { name: "Database", value: 92 },
  { name: "Storage", value: 97 },
  { name: "Frontend", value: 99 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function MetricsDashboard() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Metrics Refreshed",
        description: "Dashboard metrics have been updated with the latest data.",
      })
    }, 1000)
  }

  const handleDownload = (format) => {
    toast({
      title: "Report Downloaded",
      description: `Metrics report has been downloaded in ${format.toUpperCase()} format.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Metrics Dashboard</h2>
          <p className="text-muted-foreground">Monitor your infrastructure performance and deployment metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Select onValueChange={handleDownload}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Download" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Containers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Running Containers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deployment Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.2%</div>
            <p className="text-xs text-muted-foreground">+1.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124ms</div>
            <p className="text-xs text-muted-foreground">-12ms from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="containers" className="w-full">
        <TabsList>
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="services">Service Health</TabsTrigger>
        </TabsList>

        <TabsContent value="containers">
          <Card>
            <CardHeader>
              <CardTitle>Container Status</CardTitle>
              <CardDescription>Number of running and stopped containers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={containerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="running" stackId="a" fill="#8884d8" name="Running" />
                    <Bar dataKey="stopped" stackId="a" fill="#82ca9d" name="Stopped" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>CPU, Memory, and Network usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resourceUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network MB/s" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployments">
          <Card>
            <CardHeader>
              <CardTitle>Deployment History</CardTitle>
              <CardDescription>Successful and failed deployments over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={deploymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="successful"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Successful"
                    />
                    <Area type="monotone" dataKey="failed" stackId="1" stroke="#ff8042" fill="#ff8042" name="Failed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service Health</CardTitle>
              <CardDescription>Uptime percentage for critical services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceHealthData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {serviceHealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
