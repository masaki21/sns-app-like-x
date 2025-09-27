import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getProfileFromDatabase } from "@/lib/data/profile";

export async function loadEditableProfile(handle: string) {
  const user = await currentUser();
  const normalizedHandle = handle.toLowerCase();

  if (!user) {
    redirect(`/sign-in?redirect_url=/profile/${normalizedHandle}/edit`);
  }

  const data = await getProfileFromDatabase(normalizedHandle);

  if (!data) {
    redirect(`/profile/${normalizedHandle}`);
  }

  if (data.profile.id !== user.id) {
    redirect(`/profile/${normalizedHandle}`);
  }

  return data.profile;
}
