import type { Metadata } from "next"
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export const metadata: Metadata = {
  title: "Settings | CloudPlatform",
  description: "Manage your account and platform settings",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  )
}
