import { ContainerCreate } from "@/components/containers/container-create"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Container | CloudPlatform",
  description: "Create a new container for your application",
}

export default function CreateContainerPage() {
  return <ContainerCreate />
}
