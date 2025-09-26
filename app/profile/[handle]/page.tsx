import { notFound } from "next/navigation";
import { AppScaffold } from "@/components/layout/app-scaffold";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { PostList } from "@/components/timeline/post-list";
import { withFallback } from "@/lib/data/fallback";
import { getProfileFromDatabase } from "@/lib/data/profile";
import { getProfileSummary as getMockProfileSummary } from "@/lib/mock-data";

export default async function ProfileHandlePage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = params.handle.toLowerCase();

  const data = await withFallback(
    () => getProfileFromDatabase(handle),
    () => (handle === "sora_dev" ? getMockProfileSummary() : Promise.resolve(null)),
    (error) => console.error("Failed to load profile from database", error),
  );

  if (!data) {
    notFound();
  }

  return (
    <AppScaffold>
      <ProfileHeader profile={data.profile} />
      <ProfileTabs />
      <PostList posts={data.posts} />
    </AppScaffold>
  );
}
