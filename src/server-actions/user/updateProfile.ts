"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface UpdateProfilePayload {
  name: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  addressPhone: string;
  Street: string;
  City: string;
  State: string;
  country: string;
  postalCode?: string;
}

export async function updateProfile(data: UpdateProfilePayload) {
  try {
    const cookieStore = await cookies();

    const session = await auth.api.getSession({
      headers: {
        cookie: cookieStore.toString(),
      },
    });

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized access" };
    }

    const userId = session.user.id;

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          country: data.country,
        },
      });

      const defaultAddress = await tx.address.findFirst({
        where: {
          userId: userId,
          isDefault: true,
        },
      });

      if (defaultAddress) {
        await tx.address.update({
          where: { id: defaultAddress.id },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.addressPhone,
            Street: data.Street,
            City: data.City,
            State: data.State,
            PostalCode: data.postalCode || null,
          },
        });
      } else {
        await tx.address.create({
          data: {
            userId: userId,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.addressPhone,
            street: data.Street,
            city: data.City,
            state: data.State,
            PostalCode: data.postalCode || null,
            isDefault: true,
          },
        });
      }
    });

    revalidatePath("/account");
    revalidatePath("/account/edit");

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Profile updates transaction failure:", error);
    return { success: false, message: "Failed to update profile details" };
  }
}
