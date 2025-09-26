import Link from "next/link";
import { Avatar } from "@/components/user/avatar";
import type { TimelinePost } from "@/types/social";

export function PostCard({
  post,
  withLink = true,
}: {
  post: TimelinePost;
  withLink?: boolean;
}) {
  return (
    <article
      className={`border-b border-neutral-800 px-4 pb-4 pt-3 md:px-6 ${
        withLink ? "transition hover:bg-neutral-900/50" : ""
      }`}
    >
      <div className="flex gap-3">
        <div className="pt-1">
          <Link
            href={`/profile/${post.author.handle}`}
            className="inline-block rounded-full transition hover:opacity-80"
          >
            <Avatar
              name={post.author.name}
              size="sm"
              className="md:h-12 md:w-12 md:text-base"
            />
          </Link>
        </div>
        <div className="flex-1">
          <header className="flex flex-wrap items-center gap-1 text-sm text-neutral-400">
            <Link
              href={`/profile/${post.author.handle}`}
              className="font-semibold text-neutral-100 transition hover:text-sky-400"
            >
              {post.author.name}
            </Link>
            <Link
              href={`/profile/${post.author.handle}`}
              className="transition hover:text-sky-400"
            >
              @{post.author.handle}
            </Link>
            <span>·</span>
            <span>{post.time}</span>
          </header>
          {withLink ? (
            <Link
              href={`/post/${post.id}`}
              className="mt-2 block text-base leading-6 text-neutral-100 transition hover:text-sky-400"
            >
              {post.content}
            </Link>
          ) : (
            <p className="mt-2 text-base leading-6 text-neutral-100">{post.content}</p>
          )}
          <footer className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <Reaction label="💬" value={post.stats.replies} />
            <Reaction label="🔁" value={post.stats.reposts} />
            <Reaction label="❤️" value={post.stats.likes} />
            <Reaction label="👁️" value={post.stats.impressions} />
            <PostAction label="共有" />
          </footer>
        </div>
      </div>
    </article>
  );
}

function Reaction({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-center gap-1">
      <span aria-hidden>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PostAction({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200">
      {label}
    </button>
  );
}
