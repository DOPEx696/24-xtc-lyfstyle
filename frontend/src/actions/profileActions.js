"use server";

import { prisma } from "@/lib/prisma";

/**
 * Modern Next.js Server Actions for Profile Management
 * High performance server-side execution directly interacting with Prisma DB.
 */

export async function getProfile(email) {
  if (!email) throw new Error("Email is required to fetch profile.");
  
  try {
    let profile = await prisma.profile.findUnique({
      where: { email },
      include: { orders: true },
    });

    // If profile doesn't exist, create a default one for the guest/operator
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          email,
          username: email.split("@")[0],
          loyaltyPoints: 100, // Welcome points
        },
        include: { orders: true },
      });
    }

    return { success: true, profile };
  } catch (error) {
    console.error("Prisma error in getProfile:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProfile(email, data) {
  if (!email) throw new Error("Email is required to update profile.");

  try {
    const updatedProfile = await prisma.profile.update({
      where: { email },
      data: {
        username: data.username,
        monogram: data.monogram,
        loyaltyPoints: data.loyaltyPoints,
      },
    });

    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Prisma error in updateProfile:", error);
    return { success: false, error: error.message };
  }
}
