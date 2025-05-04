import { ContainerDetail } from "@/components/containers/container-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Container Details | CloudPlatform",
  description: "View and manage container details",
}

export default function ContainerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ContainerDetail id={params.id} />
    </div>
  )
}
