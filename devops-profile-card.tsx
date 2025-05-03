"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  GitBranch,
  GitCommit,
  GitMerge,
  Github,
  Globe,
  Mail,
  MessageSquare,
  Server,
  Shield,
  Terminal,
  Users,
} from "lucide-react"

export default function DevOpsProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alex Chen" />
              <AvatarFallback className="text-lg">AC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Alex Chen</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Server className="h-3.5 w-3.5" />
                Senior DevOps Engineer
              </CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Available
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  Team Lead
                </Badge>
              </div>
            </div>
          </div>
          <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={() => setIsFollowing(!isFollowing)}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">About</h3>
              <p className="text-sm text-muted-foreground">
                DevOps engineer with 5+ years of experience in CI/CD pipelines, infrastructure automation, and cloud
                architecture.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Team</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-primary">
                  <AvatarFallback>C1</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border border-primary">
                  <AvatarFallback>C2</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border border-primary">
                  <AvatarFallback>C3</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border border-primary">
                  <AvatarFallback>C4</AvatarFallback>
                </Avatar>
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">+3</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <GitMerge className="h-4 w-4 text-green-500" />
                  <span>
                    Merged <span className="font-medium">PR #142</span> 2 hours ago
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GitCommit className="h-4 w-4 text-blue-500" />
                  <span>
                    Committed to <span className="font-medium">main</span> 5 hours ago
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>
                    Resolved <span className="font-medium">security alert</span> 1 day ago
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Kubernetes</span>
                  <span>Expert</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Docker</span>
                  <span>Expert</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Terraform</span>
                  <span>Advanced</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>AWS</span>
                  <span>Advanced</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>CI/CD Pipelines</span>
                  <span>Expert</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Jenkins</Badge>
              <Badge variant="secondary">GitHub Actions</Badge>
              <Badge variant="secondary">Ansible</Badge>
              <Badge variant="secondary">Prometheus</Badge>
              <Badge variant="secondary">Grafana</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Bash</Badge>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Cloud Migration</h3>
                    <p className="text-xs text-muted-foreground">
                      Lead DevOps engineer for company-wide cloud migration
                    </p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>24</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitCommit className="h-3.5 w-3.5" />
                    <span>156</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>8</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Microservices Platform</h3>
                    <p className="text-xs text-muted-foreground">Kubernetes-based platform for microservices</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>42</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitCommit className="h-3.5 w-3.5" />
                    <span>287</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>5</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <TooltipProvider>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Globe className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Website</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span>Last active: 10 minutes ago</span>
        </div>
      </CardFooter>
    </Card>
  )
}
