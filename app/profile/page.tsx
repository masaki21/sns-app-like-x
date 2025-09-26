import { redirect } from "next/navigation";

const DEFAULT_PROFILE_HANDLE = "sora_dev";

export default function ProfilePage() {
  redirect(`/profile/${DEFAULT_PROFILE_HANDLE}`);
}
