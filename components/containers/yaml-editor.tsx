"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Loader2, Play, Save } from "lucide-react"

export function YamlEditor() {
  const [isApplying, setIsApplying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [yamlContent, setYamlContent] = useState(`apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
  restartPolicy: Always`)

  const handleApplyYaml = () => {
    setIsApplying(true)

    // Simulate applying YAML
    setTimeout(() => {
      setIsApplying(false)
      toast({
        title: "YAML Applied",
        description: "Configuration has been applied successfully",
      })
    }, 2000)
  }

  const handleSaveYaml = () => {
    setIsSaving(true)

    // Simulate saving YAML
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "YAML Saved",
        description: "Configuration has been saved successfully",
      })
    }, 1500)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>YAML Editor</CardTitle>
        <CardDescription>Edit and apply Kubernetes configurations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full flex flex-col">
          <textarea
            className="flex-1 w-full min-h-[400px] font-mono text-sm p-4 border rounded-md bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary"
            value={yamlContent}
            onChange={(e) => setYamlContent(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleSaveYaml} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
        <Button onClick={handleApplyYaml} disabled={isApplying}>
          {isApplying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Apply
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
