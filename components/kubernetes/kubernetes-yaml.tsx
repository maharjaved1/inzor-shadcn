"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface KubernetesYamlProps {
  yaml: string
}

export function KubernetesYaml({ yaml }: KubernetesYamlProps) {
  const [yamlContent, setYamlContent] = useState(yaml)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, you would save the YAML to the API
    toast({
      title: "YAML saved",
      description: "Your changes have been applied to the cluster",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setYamlContent(yaml)
    setIsEditing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>YAML Configuration</CardTitle>
        <CardDescription>
          {isEditing ? "Editing mode - make your changes below" : "View and edit the resource configuration"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <textarea
            value={yamlContent}
            onChange={(e) => setYamlContent(e.target.value)}
            className="w-full h-96 font-mono text-sm p-4 bg-muted rounded-md"
            readOnly={!isEditing}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit}>Edit YAML</Button>
        )}
      </CardFooter>
    </Card>
  )
}
