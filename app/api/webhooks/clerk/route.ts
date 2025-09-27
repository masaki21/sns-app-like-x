import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook, type WebhookRequiredHeaders } from "svix";

import { prisma } from "@/lib/prisma";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET ?? "";

if (!WEBHOOK_SECRET) {
  throw new Error("Missing CLERK_WEBHOOK_SECRET env var");
}

function resolvePrimaryEmail(event: WebhookEvent["data"]) {
  if (!("email_addresses" in event)) return undefined;
  const emails = event.email_addresses ?? [];
  const primaryId = "primary_email_address_id" in event ? event.primary_email_address_id : undefined;
  const primary = primaryId ? emails.find((item) => item.id === primaryId) : undefined;
  return (primary ?? emails[0])?.email_address;
}

function toHandle(event: WebhookEvent["data"], fallback: string) {
  const email = resolvePrimaryEmail(event);
  const baseHandle =
    ("username" in event && event.username) ||
    (email ? email.split("@")[0] : undefined) ||
    fallback;

  return baseHandle.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
}

function toDisplayName(event: WebhookEvent["data"], fallback: string) {
  const firstName = "first_name" in event ? event.first_name ?? "" : "";
  const lastName = "last_name" in event ? event.last_name ?? "" : "";
  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName.length > 0) {
    return fullName;
  }

  const email = resolvePrimaryEmail(event);
  return ("username" in event && event.username) || email || fallback;
}

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixSignature = headerPayload.get("svix-signature");
  const svixTimestamp = headerPayload.get("svix-timestamp");

  if (!svixId || !svixSignature || !svixTimestamp) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  const svixHeaders: WebhookRequiredHeaders = {
    "svix-id": svixId,
    "svix-signature": svixSignature,
    "svix-timestamp": svixTimestamp,
  };

  const payload = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(payload, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Clerk webhook verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "user.created": {
      const handleBase = toHandle(event.data, `user_${event.data.id.slice(-6)}`);
      const displayName = toDisplayName(event.data, handleBase);

      let handle = handleBase;
      let attempt = 0;

      while (attempt < 5) {
        try {
          await prisma.user.create({
            data: {
              id: event.data.id,
              handle,
              displayName,
              isVerified: event.data.public_metadata?.isVerified === true,
              profile: {
                create: {
                  bio: event.data.public_metadata?.bio as string | undefined,
                  avatarUrl: event.data.image_url ?? undefined,
                  location: event.data.public_metadata?.location as string | undefined,
                  websiteUrl: event.data.public_metadata?.website as string | undefined,
                },
              },
            },
          });
          break;
        } catch (error) {
          if (attempt >= 4) {
            console.error("Failed to create user in Prisma", error);
            return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
          }
          handle = `${handleBase}_${Math.random().toString(36).slice(2, 6)}`;
          attempt += 1;
        }
      }
      break;
    }
    case "user.updated": {
      const handle = toHandle(event.data, `user_${event.data.id.slice(-6)}`);
      const displayName = toDisplayName(event.data, handle);

      await prisma.user.upsert({
        where: { id: event.data.id },
        update: {
          handle,
          displayName,
          isVerified: event.data.public_metadata?.isVerified === true,
          profile: {
            upsert: {
              create: {
                bio: event.data.public_metadata?.bio as string | undefined,
                avatarUrl: event.data.image_url ?? undefined,
                location: event.data.public_metadata?.location as string | undefined,
                websiteUrl: event.data.public_metadata?.website as string | undefined,
              },
              update: {
                bio: event.data.public_metadata?.bio as string | undefined,
                avatarUrl: event.data.image_url ?? undefined,
                location: event.data.public_metadata?.location as string | undefined,
                websiteUrl: event.data.public_metadata?.website as string | undefined,
              },
            },
          },
        },
        create: {
          id: event.data.id,
          handle,
          displayName,
          isVerified: event.data.public_metadata?.isVerified === true,
          profile: {
            create: {
              bio: event.data.public_metadata?.bio as string | undefined,
              avatarUrl: event.data.image_url ?? undefined,
              location: event.data.public_metadata?.location as string | undefined,
              websiteUrl: event.data.public_metadata?.website as string | undefined,
            },
          },
        },
      });
      break;
    }
    case "user.deleted": {
      await prisma.user.delete({
        where: { id: event.data.id },
      }).catch((error) => {
        console.error("Failed to delete user from Prisma", error);
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
