"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { Check, Loader2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  const { setTheme, theme } = useTheme()
  const [fullName, setFullName] = useState("John Doe")
  const [displayName, setDisplayName] = useState("johndoe")
  const [bio, setBio] = useState(
    "DevOps engineer with 5+ years of experience in cloud infrastructure and containerization.",
  )
  const [location, setLocation] = useState("San Francisco, CA")
  const [website, setWebsite] = useState("https://johndoe.com")
  const [email, setEmail] = useState("john.doe@example.com")
  const [username, setUsername] = useState("johndoe")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [accentColor, setAccentColor] = useState("blue")
  const [fontSize, setFontSize] = useState("medium")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Profile updated successfully")
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    }, 1500)
  }

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      setSuccessMessage("Password updated successfully")
      setShowSuccess(true)

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully",
      })
    }, 1500)
  }

  const handleGenerateCodes = () => {
    toast({
      title: "Recovery Codes Generated",
      description: "New recovery codes have been generated and sent to your email",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "A confirmation email has been sent to your email address",
      variant: "destructive",
    })
  }

  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: "Theme Changed",
      description: `Theme has been changed to ${newTheme}`,
    })
  }

  const handleChangeAccentColor = (color: string) => {
    setAccentColor(color)

    // In a real app, this would update the theme
    document.documentElement.style.setProperty("--primary", `hsl(${getColorHue(color)} 100% 50%)`)

    toast({
      title: "Accent Color Changed",
      description: `Accent color has been changed to ${color}`,
    })
  }

  const getColorHue = (color: string): number => {
    switch (color) {
      case "blue":
        return 210
      case "green":
        return 142
      case "purple":
        return 262
      case "orange":
        return 32
      case "pink":
        return 330
      case "cyan":
        return 186
      default:
        return 210
    }
  }

  const handleChangeFontSize = (size: string) => {
    setFontSize(size)
    toast({
      title: "Font Size Changed",
      description: `Font size has been changed to ${size}`,
    })
  }

  const handleCreateApiKey = () => {
    toast({
      title: "API Key Created",
      description: "A new API key has been created",
    })
  }

  const handleAddWebhook = () => {
    toast({
      title: "Webhook Added",
      description: "A new webhook has been added",
    })
  }

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-5 w-full md:w-auto">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400">
          <Check className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
            <CardDescription>Highlight your technical skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                <Badge>Docker</Badge>
                <Badge>Kubernetes</Badge>
                <Badge>AWS</Badge>
                <Badge>Terraform</Badge>
                <Badge>CI/CD</Badge>
                <Badge>Python</Badge>
                <Badge>JavaScript</Badge>
                <Badge>Git</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Linux</Badge>
                <Button variant="outline" size="sm" className="h-6">
                  + Add Skill
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Account"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Recovery Codes</h3>
                <p className="text-sm text-muted-foreground">Generate backup codes for account recovery</p>
              </div>
              <Button variant="outline" onClick={handleGenerateCodes}>
                Generate Codes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleChangeTheme("light")}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleChangeTheme("dark")}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleChangeTheme("system")}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                  System
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="grid grid-cols-6 gap-2">
                <div
                  className={`h-8 rounded-md bg-blue-500 cursor-pointer ${accentColor === "blue" ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                  onClick={() => handleChangeAccentColor("blue")}
                />
                <div
                  className={`h-8 rounded-md bg-green-500 cursor-pointer ${accentColor === "green" ? "ring-2 ring-offset-2 ring-green-500" : ""}`}
                  onClick={() => handleChangeAccentColor("green")}
                />
                <div
                  className={`h-8 rounded-md bg-purple-500 cursor-pointer ${accentColor === "purple" ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                  onClick={() => handleChangeAccentColor("purple")}
                />
                <div
                  className={`h-8 rounded-md bg-orange-500 cursor-pointer ${accentColor === "orange" ? "ring-2 ring-offset-2 ring-orange-500" : ""}`}
                  onClick={() => handleChangeAccentColor("orange")}
                />
                <div
                  className={`h-8 rounded-md bg-pink-500 cursor-pointer ${accentColor === "pink" ? "ring-2 ring-offset-2 ring-pink-500" : ""}`}
                  onClick={() => handleChangeAccentColor("pink")}
                />
                <div
                  className={`h-8 rounded-md bg-cyan-500 cursor-pointer ${accentColor === "cyan" ? "ring-2 ring-offset-2 ring-cyan-500" : ""}`}
                  onClick={() => handleChangeAccentColor("cyan")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select value={fontSize} onValueChange={handleChangeFontSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Appearance Settings"
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Browser Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Mobile Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
                </div>
                <Switch />
              </div>
            </div>
            <div className="pt-4 space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="deploy-notifications">Deployment Status</Label>
                  <Switch id="deploy-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-notifications">System Alerts</Label>
                  <Switch id="system-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-notifications">Security Alerts</Label>
                  <Switch id="security-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="billing-notifications">Billing Updates</Label>
                  <Switch id="billing-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="team-notifications">Team Activity</Label>
                  <Switch id="team-notifications" defaultChecked />
                </div>
              </div>
            </div>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Notification Settings"
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="api" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys for programmatic access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Production API Key</h3>
                  <p className="text-sm text-muted-foreground">Created 3 months ago</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reveal
                  </Button>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Development API Key</h3>
                  <p className="text-sm text-muted-foreground">Created 1 month ago</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reveal
                  </Button>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
              <Button onClick={handleCreateApiKey}>Create New API Key</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>Configure webhooks for event notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Deployment Webhook</h3>
                  <p className="text-sm text-muted-foreground">https://example.com/webhooks/deploy</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Monitoring Webhook</h3>
                  <p className="text-sm text-muted-foreground">https://example.com/webhooks/monitor</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <Button onClick={handleAddWebhook}>Add Webhook</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
