"use server";

import { prisma } from "@/database/db";
import { auth } from "@/lib/auth";

export async function getProfile() {
  try {
    const session = await auth.api.getSession({
      headers: {
        cookie: (await import("next/headers")).cookies().toString(),
      },
    });

    if (!session || !session.user) {
      return null;
    }

    const userProfile = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        addresses: {
          where: {
            isDefault: true,
          },
          take: 1,
        },
      },
    });

    return userProfile;
  } catch (error) {
    console.error("Fetch profile database failure:", error);
    return null;
  }
}
