import type { Metadata } from "next"
import { KubernetesHeader } from "@/components/kubernetes/kubernetes-header"
import { KubernetesClusters } from "@/components/kubernetes/kubernetes-clusters"
import { KubernetesWorkloads } from "@/components/kubernetes/kubernetes-workloads"

export const metadata: Metadata = {
  title: "Kubernetes | CloudPlatform",
  description: "Manage your Kubernetes clusters",
}

export default function KubernetesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <KubernetesHeader />
      <KubernetesClusters />
      <KubernetesWorkloads />
    </div>
  )
}
