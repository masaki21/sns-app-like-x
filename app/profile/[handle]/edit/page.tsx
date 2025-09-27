import { loadEditableProfile } from "@/lib/data/profile-edit";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";

export default async function ProfileEditPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;
  const profile = await loadEditableProfile(handle);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-neutral-100">プロフィールを編集</h1>
      <p className="text-sm text-neutral-500">
        表示名や自己紹介、連絡先などのプロフィール情報を更新できます。
      </p>
      <ProfileEditForm profile={profile} />
    </div>
  );
}
