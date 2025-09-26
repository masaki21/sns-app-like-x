import { Sidebar } from "@/components/navigation/sidebar";
import { SettingsPanel } from "@/components/settings/settings-section";
import { getSettings } from "@/lib/mock-data";
import { navItems } from "@/lib/navigation";

export default async function SettingsPage() {
  const sections = await getSettings();

  return (
    <div className="min-h-screen bg-neutral-950 pb-20 text-neutral-100 md:pb-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar
          brandLabel="sns-app"
          primaryActionLabel="投稿する"
          navItems={navItems}
        />

        <main className="min-h-screen flex-1 border-neutral-800 md:border-x">
          <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur md:px-6">
            <h1 className="text-xl font-semibold">設定</h1>
            <p className="text-sm text-neutral-500">アカウント・通知設定を確認</p>
          </header>
          <div className="px-4 py-6 md:px-6">
            <SettingsPanel sections={sections} />
          </div>
        </main>
      </div>
    </div>
  );
}
