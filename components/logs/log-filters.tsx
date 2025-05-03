"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function LogFilters() {
  const [logLevel, setLogLevel] = useState("all")
  const [timeRange, setTimeRange] = useState("1h")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState([30])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Filter and customize log view</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Log Level</Label>
          <RadioGroup value={logLevel} onValueChange={setLogLevel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="error" id="error" />
              <Label htmlFor="error">Error</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="warn" id="warn" />
              <Label htmlFor="warn">Warning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="info" id="info" />
              <Label htmlFor="info">Info</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="debug" id="debug" />
              <Label htmlFor="debug">Debug</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Source</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="containers">Containers</SelectItem>
              <SelectItem value="kubernetes">Kubernetes</SelectItem>
              <SelectItem value="databases">Databases</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Time Range</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">Last 15 minutes</SelectItem>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-refresh">Auto Refresh</Label>
            <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>
          {autoRefresh && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Refresh Interval: {refreshInterval[0]}s</Label>
              </div>
              <Slider value={refreshInterval} min={5} max={60} step={5} onValueChange={setRefreshInterval} />
            </div>
          )}
        </div>

        <Button className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
