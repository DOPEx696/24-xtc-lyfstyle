import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { items, email } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items in transit cart" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Initiate email coordinate required" }, { status: 400 });
    }

    // Product pricing database for calculations
    const pricing = {
      "survival-deck-parava": 15,
      "basic-deck-xtc": 120,
    };

    let calculatedTotal = 0;
    items.forEach((item) => {
      const price = pricing[item.id] || 0;
      calculatedTotal += price * item.quantity;
    });

    if (calculatedTotal <= 0) {
      return NextResponse.json({ error: "Acquisition value must exceed zero" }, { status: 400 });
    }

    // Initialize Razorpay client
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_PLACEHOLDER_KEY",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_PLACEHOLDER_SECRET",
    });

    // Create Razorpay Order
    const options = {
      amount: calculatedTotal * 100, // Razorpay amount in paise (₹1 = 100 paise)
      currency: "INR",
      receipt: `receipt_xtc_${Date.now()}`,
    };

    const razorpayOrder = await rzp.orders.create(options);

    // Ensure Profile exists on Aiven PostgreSQL
    let profile = await prisma.profile.findUnique({
      where: { email },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          email,
          username: email.split("@")[0].toUpperCase(),
          loyaltyPoints: 100, // Welcome gift points
        },
      });
    }

    // Log Pending Order in Aiven Database
    await prisma.order.create({
      data: {
        amount: calculatedTotal,
        currency: "INR",
        status: "PENDING",
        razorpayOrderId: razorpayOrder.id,
        items: JSON.stringify(items),
        profileId: profile.id,
      },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Initiate Checkout Error:", error);
    return NextResponse.json(
      { error: "Transit order initiation failed. Verify database connectivity." },
      { status: 500 }
    );
  }
}
