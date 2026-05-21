import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email parameter required" }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({
      where: { email },
      include: { orders: true },
    });

    if (!profile) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, profile });
  } catch (error) {
    console.error("Fetch operator error:", error);
    return NextResponse.json({ error: "Database error fetching profile." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, username } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required for operator sync" }, { status: 400 });
    }

    const profile = await prisma.profile.upsert({
      where: { email },
      update: {
        username: username || email.split("@")[0].toUpperCase(),
      },
      create: {
        email,
        username: username || email.split("@")[0].toUpperCase(),
        loyaltyPoints: 100, // Welcome bonus points
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Upsert operator error:", error);
    return NextResponse.json({ error: "Database error saving profile." }, { status: 500 });
  }
}
