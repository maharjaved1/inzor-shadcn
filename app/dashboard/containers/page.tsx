import { ContainerList } from "@/components/containers/container-list"
import { ContainerHeader } from "@/components/containers/container-header"
import { ContainerManagement } from "@/components/containers/container-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Containers | CloudPlatform",
  description: "Manage your Docker containers",
}

export default function ContainersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ContainerHeader />
      <ContainerList />
      <ContainerManagement />
    </div>
  )
}
