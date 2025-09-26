import { Avatar } from "@/components/user/avatar";
import type { ProfileSummary } from "@/types/social";

export function ProfileHeader({ profile }: { profile: ProfileSummary }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      <div className="h-32 bg-gradient-to-r from-sky-600/60 via-purple-600/40 to-emerald-500/30" aria-hidden />
      <div className="-mt-10 flex flex-col gap-4 px-4 pb-6 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="rounded-full border-4 border-neutral-900">
            <Avatar name={profile.name} size="md" className="h-20 w-20 text-xl md:h-24 md:w-24 md:text-2xl" />
          </div>
          <button className="w-full rounded-full border border-neutral-600 px-5 py-2 text-sm font-semibold text-neutral-100 transition hover:border-sky-500 hover:text-sky-400 sm:w-auto">
            プロフィールを編集
          </button>
        </div>
        <header>
          <h1 className="text-2xl font-semibold text-neutral-100">{profile.name}</h1>
          <p className="text-sm text-neutral-500">@{profile.handle}</p>
        </header>
        <p className="text-sm text-neutral-100">{profile.bio}</p>
        <ul className="flex flex-wrap gap-4 text-xs text-neutral-500">
          <li>📍 {profile.location}</li>
          <li>🔗 <a className="text-sky-400" href={profile.website}> {profile.website}</a></li>
          <li>🗓️ {profile.joinedAt} 参加</li>
        </ul>
        <div className="flex gap-6 text-sm text-neutral-500">
          <span>
            <strong className="text-neutral-100">{profile.stats.posts}</strong> 投稿
          </span>
          <span>
            <strong className="text-neutral-100">{profile.stats.followers}</strong> フォロワー
          </span>
          <span>
            <strong className="text-neutral-100">{profile.stats.following}</strong> フォロー中
          </span>
        </div>
      </div>
    </section>
  );
}
