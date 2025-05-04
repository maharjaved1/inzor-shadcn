import { GitHubHeader } from "@/components/github/github-header"
import { GitHubRepositories } from "@/components/github/github-repositories"
import { GitHubActions } from "@/components/github/github-actions"
import { GitHubPullRequests } from "@/components/github/github-pull-requests"
import { GitHubIssues } from "@/components/github/github-issues"

export default function GitHubPage() {
  return (
    <div className="flex flex-col gap-6">
      <GitHubHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GitHubRepositories />
        <GitHubActions />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GitHubPullRequests />
        <GitHubIssues />
      </div>
    </div>
  )
}
