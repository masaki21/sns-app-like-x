import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { handle: true },
  });

  if (user?.handle) {
    redirect(`/profile/${user.handle}`);
  }

  redirect("/");
}
