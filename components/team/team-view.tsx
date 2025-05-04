"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "DevOps Engineer",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    projects: ["Container Migration", "Kubernetes Cluster Setup"],
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sam Wilson",
    role: "Backend Developer",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    projects: ["API Gateway", "Database Optimization"],
    lastActive: "5 minutes ago",
  },
  {
    id: "3",
    name: "Taylor Swift",
    role: "Frontend Developer",
    email: "taylor@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    projects: ["Dashboard UI", "User Authentication"],
    lastActive: "1 day ago",
  },
  {
    id: "4",
    name: "Jordan Lee",
    role: "Cloud Architect",
    email: "jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    projects: ["Infrastructure as Code", "CI/CD Pipeline"],
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Casey Kim",
    role: "Security Engineer",
    email: "casey@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    projects: ["Vulnerability Assessment", "Access Control"],
    lastActive: "30 minutes ago",
  },
]

// Mock projects data
const teamProjects = [
  {
    id: "1",
    name: "Container Migration",
    description: "Migrating legacy applications to containerized environments",
    status: "In Progress",
    completion: 65,
    members: ["1", "4"],
    dueDate: "2023-12-15",
  },
  {
    id: "2",
    name: "Kubernetes Cluster Setup",
    description: "Setting up and configuring production Kubernetes clusters",
    status: "In Progress",
    completion: 40,
    members: ["1", "4", "5"],
    dueDate: "2023-11-30",
  },
  {
    id: "3",
    name: "API Gateway",
    description: "Implementing a centralized API gateway for microservices",
    status: "Completed",
    completion: 100,
    members: ["2", "4"],
    dueDate: "2023-10-15",
  },
  {
    id: "4",
    name: "Dashboard UI",
    description: "Developing the main dashboard UI for the platform",
    status: "In Progress",
    completion: 80,
    members: ["3"],
    dueDate: "2023-11-10",
  },
  {
    id: "5",
    name: "CI/CD Pipeline",
    description: "Setting up automated CI/CD pipelines for all projects",
    status: "Planning",
    completion: 15,
    members: ["4", "1"],
    dueDate: "2023-12-30",
  },
]

export function TeamView() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")

  // Filter members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInvite = () => {
    if (!inviteEmail || !inviteRole) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and role for the invitation.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail} for the role of ${inviteRole}.`,
    })

    setInviteEmail("")
    setInviteRole("")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getProjectStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500"
      case "Completed":
        return "text-green-500"
      case "Planning":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage your team members and their access to projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Invite Team Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team. They'll receive an email with instructions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  className="col-span-3"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  placeholder="DevOps Engineer"
                  className="col-span-3"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleInvite}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search team members..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{member.email}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="capitalize">{member.status}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Last active:</span>
                      <span>{member.lastActive}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-muted-foreground">Projects:</span>
                      <div className="mt-1 space-y-1">
                        {member.projects.map((project) => (
                          <div key={project} className="text-xs px-2 py-1 bg-secondary rounded-md">
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({ title: "Message Sent", description: `You sent a message to ${member.name}` })
                    }
                  >
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({ title: "Profile Viewed", description: `You viewed ${member.name}'s profile` })
                    }
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <span className={`text-sm font-medium ${getProjectStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${project.completion}%` }} />
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="py-1">
                        <span className="text-muted-foreground">Team Members:</span>
                        <div className="flex -space-x-2 mt-1">
                          {project.members.map((memberId) => {
                            const member = teamMembers.find((m) => m.id === memberId)
                            return (
                              <Avatar key={memberId} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={member?.avatar || "/placeholder.svg"} alt={member?.name} />
                                <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({ title: "Project Details", description: `Viewing details for ${project.name}` })
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast({ title: "Project Updated", description: `${project.name} has been updated` })}
                  >
                    Update Status
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
