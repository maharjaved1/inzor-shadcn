import type { Metadata } from "next"
import { DatabaseHeader } from "@/components/databases/database-header"
import { DatabaseList } from "@/components/databases/database-list"

export const metadata: Metadata = {
  title: "Databases | CloudPlatform",
  description: "Manage your database instances",
}

export default function DatabasesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DatabaseHeader />
      <DatabaseList />
    </div>
  )
}
