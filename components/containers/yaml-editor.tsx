"use client"

import { useState } from "react"
import { AlertCircle, Check, Copy, FileCode, Play, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample YAML templates
const templates = {
  deployment: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80`,
  service: `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
  - port: 80
    targetPort: 9376
  type: ClusterIP`,
  configmap: `apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
data:
  game.properties: |
    enemies=aliens
    lives=3
    enemies.cheat=true
    enemies.cheat.level=noGoodRotten
  ui.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true`,
  docker: `version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    restart: always
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: example
      POSTGRES_USER: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:`,
}

export function YamlEditor() {
  const [activeTab, setActiveTab] = useState("deployment")
  const [yamlContent, setYamlContent] = useState(templates.deployment)
  const [validationMessage, setValidationMessage] = useState("")
  const [validationStatus, setValidationStatus] = useState<"success" | "error" | null>(null)

  const handleTemplateChange = (template: string) => {
    setActiveTab(template)
    setYamlContent(templates[template as keyof typeof templates])
    setValidationMessage("")
    setValidationStatus(null)
  }

  const validateYaml = () => {
    // Simple validation - in a real app you'd use a proper YAML parser
    try {
      // Simulate validation
      if (yamlContent.includes("kind:") && yamlContent.includes("apiVersion:")) {
        setValidationStatus("success")
        setValidationMessage("YAML validation successful!")
        toast({
          title: "Validation successful",
          description: "Your YAML configuration is valid",
        })
      } else {
        setValidationStatus("error")
        setValidationMessage("YAML validation failed: Missing required fields")
        toast({
          variant: "destructive",
          title: "Validation failed",
          description: "Your YAML configuration has errors",
        })
      }
    } catch (error) {
      setValidationStatus("error")
      setValidationMessage(`YAML validation failed: ${error}`)
      toast({
        variant: "destructive",
        title: "Validation failed",
        description: `Error: ${error}`,
      })
    }
  }

  const applyConfiguration = () => {
    // Simulate applying the configuration
    toast({
      title: "Configuration applied",
      description: "Your YAML configuration has been applied",
    })
  }

  const copyYaml = () => {
    navigator.clipboard.writeText(yamlContent)
    toast({
      title: "Copied to clipboard",
      description: "YAML content copied to clipboard",
    })
  }

  const saveYaml = () => {
    // Create a blob and download it
    const blob = new Blob([yamlContent], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-config.yaml`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "File saved",
      description: `${activeTab}-config.yaml has been downloaded`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          YAML Configuration Editor
        </CardTitle>
        <CardDescription>Create and edit YAML configurations for containers and Kubernetes resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deployment" value={activeTab} onValueChange={handleTemplateChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="configmap">ConfigMap</TabsTrigger>
            <TabsTrigger value="docker">Docker Compose</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Edit YAML Configuration</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 gap-1" onClick={copyYaml}>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1" onClick={saveYaml}>
                <Save className="h-3.5 w-3.5" />
                <span>Save</span>
              </Button>
            </div>
          </div>
          <Textarea
            className="font-mono text-sm h-96 resize-none"
            value={yamlContent}
            onChange={(e) => {
              setYamlContent(e.target.value)
              setValidationStatus(null)
              setValidationMessage("")
            }}
          />
        </div>

        {validationStatus && (
          <Alert
            className={`mt-4 ${validationStatus === "success" ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300" : "bg-destructive/20 text-destructive"}`}
          >
            {validationStatus === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{validationStatus === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{validationMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2" onClick={validateYaml}>
          <Check className="h-4 w-4" />
          <span>Validate</span>
        </Button>
        <Button className="flex-1 gap-2" onClick={applyConfiguration} disabled={validationStatus !== "success"}>
          <Play className="h-4 w-4" />
          <span>Apply</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
