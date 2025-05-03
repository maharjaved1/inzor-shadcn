"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

const templates = [
  {
    id: "t1",
    name: "Web Dashboard",
    category: "web",
    description: "Interactive dashboard with charts and tables",
    difficulty: "medium",
    featured: true,
  },
  {
    id: "t2",
    name: "REST API",
    category: "backend",
    description: "Create a REST API with CRUD operations",
    difficulty: "medium",
    featured: true,
  },
  {
    id: "t3",
    name: "Database Admin",
    category: "database",
    description: "Database administration interface",
    difficulty: "hard",
    featured: false,
  },
  {
    id: "t4",
    name: "Landing Page",
    category: "web",
    description: "Responsive landing page template",
    difficulty: "easy",
    featured: false,
  },
  {
    id: "t5",
    name: "Authentication Service",
    category: "backend",
    description: "User authentication and authorization",
    difficulty: "medium",
    featured: false,
  },
  {
    id: "t6",
    name: "E-commerce Store",
    category: "web",
    description: "Complete e-commerce storefront",
    difficulty: "hard",
    featured: true,
  },
  {
    id: "t7",
    name: "Blog",
    category: "web",
    description: "Simple blog with content management",
    difficulty: "easy",
    featured: false,
  },
  {
    id: "t8",
    name: "File Storage",
    category: "backend",
    description: "File upload and storage service",
    difficulty: "medium",
    featured: false,
  },
]

export function NoCodeTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState("t1")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates</CardTitle>
        <CardDescription>Choose a template to start with</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${
                  selectedTemplate === template.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.featured && (
                      <Badge variant={selectedTemplate === template.id ? "outline" : "secondary"} className="ml-auto">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p
                    className={`text-sm ${selectedTemplate === template.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {template.description}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant={selectedTemplate === template.id ? "outline" : "secondary"}>
                      {template.category}
                    </Badge>
                    <Badge variant={selectedTemplate === template.id ? "outline" : "secondary"}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
                {selectedTemplate === template.id && (
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
