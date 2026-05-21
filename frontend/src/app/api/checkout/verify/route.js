import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      monogram,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing checkout validation tokens" }, { status: 400 });
    }

    // Cryptographic signature matching
    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_PLACEHOLDER_SECRET";
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      // Update order status to FAILED in Aiven db logs
      try {
        await prisma.order.update({
          where: { razorpayOrderId: razorpay_order_id },
          data: { status: "FAILED" },
        });
      } catch (e) {
        console.error("Order fail log update failed:", e);
      }
      return NextResponse.json({ error: "Cryptographic signature validation failure" }, { status: 400 });
    }

    // Success transition - update order in database
    const dbOrder = await prisma.order.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // Calculate loyalty points (1 point per ₹10 spent, rounded down)
    const pointsEarned = Math.floor(dbOrder.amount / 10);

    // Update Profile and loyalty program specs in Aiven database
    const updatedProfile = await prisma.profile.update({
      where: { email },
      data: {
        loyaltyPoints: {
          increment: pointsEarned,
        },
        // Save user's personalized custom monogram if provided
        ...(monogram ? { monogram } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      pointsEarned,
      newPointsBalance: updatedProfile.loyaltyPoints,
      username: updatedProfile.username,
      monogram: updatedProfile.monogram,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed. Verify Aiven connection." },
      { status: 500 }
    );
  }
}
