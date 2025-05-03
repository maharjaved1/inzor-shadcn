import type { Metadata } from "next"
import { ContainerList } from "@/components/containers/container-list"
import { ContainerHeader } from "@/components/containers/container-header"

export const metadata: Metadata = {
  title: "Containers | CloudPlatform",
  description: "Manage your Docker containers",
}

export default function ContainersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ContainerHeader />
      <ContainerList />
    </div>
  )
}
