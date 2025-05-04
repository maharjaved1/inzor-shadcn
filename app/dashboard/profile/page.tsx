import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <SettingsTabs />
    </div>
  )
}
