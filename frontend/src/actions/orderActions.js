"use server";

import { prisma } from "@/lib/prisma";

/**
 * Modern Next.js Server Actions for Order & Transaction Management
 * Secure, fast, and handles full-stack database operations on the server.
 */

export async function createOrder({ email, amount, items }) {
  if (!email) throw new Error("Email is required to place an order.");
  if (!amount || amount <= 0) throw new Error("Invalid order amount.");

  try {
    // 1. Fetch the user profile to link the order
    const profile = await prisma.profile.findUnique({
      where: { email },
    });

    if (!profile) {
      throw new Error(`Profile not found for email: ${email}`);
    }

    // 2. Create standard pending order record in Prisma
    const newOrder = await prisma.order.create({
      data: {
        amount,
        items: typeof items === "string" ? items : JSON.stringify(items),
        status: "PENDING",
        profileId: profile.id,
      },
    });

    // 3. Award loyalty points teaser (calculate 5% of order value as loyalty points)
    const pointsAwarded = Math.floor(amount * 0.05);

    return { 
      success: true, 
      order: newOrder,
      pointsAwarded
    };
  } catch (error) {
    console.error("Prisma error in createOrder:", error);
    return { success: false, error: error.message };
  }
}

export async function updateOrderPayment({ orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature, status }) {
  if (!orderId) throw new Error("OrderId is required to update order status.");

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        status: status || "SUCCESS",
      },
      include: {
        profile: true,
      }
    });

    // Award loyalty points to the profile if success
    if (updatedOrder.status === "SUCCESS" && updatedOrder.profile) {
      const pointsToReceive = Math.floor(updatedOrder.amount * 0.05);
      await prisma.profile.update({
        where: { id: updatedOrder.profile.id },
        data: {
          loyaltyPoints: {
            increment: pointsToReceive
          }
        }
      });
    }

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Prisma error in updateOrderPayment:", error);
    return { success: false, error: error.message };
  }
}
