import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "deployed",
    target: "web-app-frontend",
    time: "2 minutes ago",
    status: "success",
  },
  {
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "created",
    target: "database-instance-3",
    time: "1 hour ago",
    status: "success",
  },
  {
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    action: "updated",
    target: "kubernetes-cluster",
    time: "3 hours ago",
    status: "success",
  },
  {
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    action: "deleted",
    target: "test-container",
    time: "5 hours ago",
    status: "warning",
  },
  {
    user: {
      name: "Alex Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AB",
    },
    action: "pulled",
    target: "nginx:latest",
    time: "1 day ago",
    status: "success",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name} <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-semibold">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
          <Badge variant={activity.status === "success" ? "default" : "destructive"}>{activity.status}</Badge>
        </div>
      ))}
    </div>
  )
}
