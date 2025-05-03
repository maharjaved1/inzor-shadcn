import type { Metadata } from "next"
import { NoCodeHeader } from "@/components/no-code/no-code-header"
import { NoCodeTemplates } from "@/components/no-code/no-code-templates"
import { NoCodeBuilder } from "@/components/no-code/no-code-builder"

export const metadata: Metadata = {
  title: "No-Code Builder | CloudPlatform",
  description: "Build applications without code",
}

export default function NoCodePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <NoCodeHeader />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <NoCodeTemplates />
        </div>
        <div className="md:col-span-3">
          <NoCodeBuilder />
        </div>
      </div>
    </div>
  )
}
