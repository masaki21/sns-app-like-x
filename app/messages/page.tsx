import { Sidebar } from "@/components/navigation/sidebar";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageThreadView } from "@/components/messages/message-thread";
import { getMessageOverview } from "@/lib/mock-data";
import { navItems } from "@/lib/navigation";

export default async function MessagesPage() {
  const { previews, threads } = await getMessageOverview();
  const activeThread = threads[0];

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
            <h1 className="text-xl font-semibold">メッセージ</h1>
            <p className="text-sm text-neutral-500">チームとの会話をまとめて確認</p>
          </header>
          <div className="flex flex-col gap-6 px-4 py-6 lg:flex-row md:px-6">
            <ConversationList previews={previews} />
            {activeThread ? (
              <MessageThreadView thread={activeThread} />
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/40 text-neutral-500">
                メッセージを選択してください
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
