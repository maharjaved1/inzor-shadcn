"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "text",
    description: "Most advanced model for text and vision tasks",
    featured: true,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    type: "text",
    description: "High-performance model for complex reasoning",
    featured: true,
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "Meta",
    type: "text",
    description: "Open-source large language model",
    featured: false,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    type: "text",
    description: "Multimodal model for text and code",
    featured: true,
  },
  {
    id: "stable-diffusion-xl",
    name: "Stable Diffusion XL",
    provider: "Stability AI",
    type: "image",
    description: "Advanced image generation model",
    featured: false,
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    type: "image",
    description: "High-quality image generation from text",
    featured: true,
  },
  {
    id: "whisper-large-v3",
    name: "Whisper Large v3",
    provider: "OpenAI",
    type: "audio",
    description: "Speech recognition and transcription",
    featured: false,
  },
  {
    id: "codellama-34b",
    name: "CodeLlama 34B",
    provider: "Meta",
    type: "code",
    description: "Specialized for code generation",
    featured: false,
  },
]

export function AIModelSelector() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o")

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Models</CardTitle>
        <CardDescription>Select a model to use in the playground</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-2">
            {models.map((model) => (
              <div
                key={model.id}
                className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${
                  selectedModel === model.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{model.name}</h3>
                    {model.featured && (
                      <Badge variant={selectedModel === model.id ? "outline" : "secondary"} className="ml-auto">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p
                    className={`text-sm ${selectedModel === model.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {model.provider}
                  </p>
                  <p
                    className={`text-sm mt-1 ${selectedModel === model.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {model.description}
                  </p>
                  <div className="mt-2">
                    <Badge variant={selectedModel === model.id ? "outline" : "secondary"}>{model.type}</Badge>
                  </div>
                </div>
                {selectedModel === model.id && (
                  <div className="ml-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
