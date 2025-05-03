import type { Metadata } from "next"
import { LogsHeader } from "@/components/logs/logs-header"
import { LogViewer } from "@/components/logs/log-viewer"
import { LogFilters } from "@/components/logs/log-filters"

export const metadata: Metadata = {
  title: "Logs | CloudPlatform",
  description: "View system and application logs",
}

export default function LogsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <LogsHeader />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <LogFilters />
        </div>
        <div className="md:col-span-3">
          <LogViewer />
        </div>
      </div>
    </div>
  )
}
