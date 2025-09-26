import { Avatar } from "@/components/user/avatar";

export function PostComposer() {
  return (
    <section className="border-b border-neutral-800 px-4 pb-4 pt-3 md:px-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="sm:pt-1">
          <Avatar name="You" size="sm" className="md:h-12 md:w-12 md:text-base" />
        </div>
        <div className="flex-1">
          <textarea
            placeholder="いまどうしてる？"
            className="w-full resize-none rounded-lg bg-neutral-900 px-4 py-3 text-base text-neutral-100 outline-none placeholder:text-neutral-500"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-3 text-lg text-sky-500" aria-hidden>
              <span>🖼️</span>
              <span>🎥</span>
              <span>📊</span>
              <span>📍</span>
            </div>
            <button
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white opacity-60"
            >
              投稿する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
