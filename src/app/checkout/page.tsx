"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
const [orderId, setOrderId] = useState("");
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
const savedOrder = localStorage.getItem("lastOrder");


if (savedOrder) {
  try {
    const orderData = JSON.parse(savedOrder);

    setOrderId(orderData.orderId || "");
    setTotalAmount(orderData.totalAmount || 0);
  } catch (error) {
    console.error("Order data error:", error);
  }
}


}, []);

return ( <main className="min-h-screen bg-gray-50 px-4 py-12"> <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">


    <div className="text-4xl font-bold text-green-600">
      Success
    </div>

    <h1 className="mt-5 text-3xl font-bold text-gray-900">
      Order Placed Successfully!
    </h1>

    <p className="mt-3 text-gray-600">
      Thank you for shopping with AmanMart.
    </p>

    <div className="mt-6 rounded-xl bg-gray-50 p-5 text-left">

      <div className="flex justify-between border-b pb-3">
        <span className="text-gray-600">
          Order ID
        </span>

        <span className="max-w-[220px] break-all text-right font-semibold text-gray-900">
          {orderId || "Loading..."}
        </span>
      </div>

      <div className="flex justify-between pt-3">
        <span className="text-gray-600">
          Total Amount
        </span>

        <span className="font-bold text-gray-900">
          Rs. {totalAmount}
        </span>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="font-medium text-gray-900">
          Payment Method
        </p>

        <p className="mt-1 text-sm text-gray-600">
          Cash on Delivery (COD)
        </p>
      </div>

    </div>

    <p className="mt-5 text-sm text-gray-500">
      Your order will be delivered soon.
    </p>

    <Link
      href="/"
      className="mt-7 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
    >
      Continue Shopping
    </Link>

  </div>
</main>


);
}
