import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      phone,
      address,
      city,
      pincode,
      items,
      totalAmount,
      paymentMethod,
    } = body;

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode ||
      !items ||
      items.length === 0 ||
      totalAmount === undefined
    ) {
      return NextResponse.json(
        { message: "All order details are required" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      name,
      phone,
      address,
      city,
      pincode,
      items,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      status: "Pending",
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      { message: "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Orders Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { message: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid order status" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Order status updated successfully",
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Order Status Error:", error);

    return NextResponse.json(
      { message: "Failed to update order status" },
      { status: 500 }
    );
  }
}
