import type { Metadata } from "next"
import { AIPlaygroundHeader } from "@/components/ai-playground/ai-playground-header"
import { AIModelSelector } from "@/components/ai-playground/ai-model-selector"
import { AIPlaygroundInterface } from "@/components/ai-playground/ai-playground-interface"

export const metadata: Metadata = {
  title: "AI Playground | CloudPlatform",
  description: "Experiment with AI models",
}

export default function AIPlaygroundPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <AIPlaygroundHeader />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <AIModelSelector />
        </div>
        <div className="md:col-span-3">
          <AIPlaygroundInterface />
        </div>
      </div>
    </div>
  )
}
