import type { Metadata } from "next"
import { GitHubHeader } from "@/components/github/github-header"
import { GitHubRepositories } from "@/components/github/github-repositories"
import { GitHubActions } from "@/components/github/github-actions"

export const metadata: Metadata = {
  title: "GitHub | CloudPlatform",
  description: "Manage your GitHub repositories and workflows",
}

export default function GitHubPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <GitHubHeader />
      <GitHubRepositories />
      <GitHubActions />
    </div>
  )
}
