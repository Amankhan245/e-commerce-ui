"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Failed to load order:", error);
      }
    }
  }, []);

  const orderId =
    order?.order?._id ||
    order?._id ||
    searchParams.get("orderId") ||
    "N/A";

  const total =
    order?.order?.totalAmount ??
    order?.totalAmount ??
    searchParams.get("total") ??
    0;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
          OK
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Order Placed Successfully
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for your order. Your order has been placed successfully.
        </p>

        <div className="mb-6 rounded-xl bg-gray-50 p-4 text-left">
          <p className="mb-2 text-sm text-gray-500">Order ID</p>
          <p className="break-all font-semibold text-gray-900">
            {String(orderId)}
          </p>

          <div className="my-4 border-t" />

          <p className="mb-2 text-sm text-gray-500">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">
            Rs. {Number(total).toFixed(2)}
          </p>

          <div className="my-4 border-t" />

          <p className="mb-2 text-sm text-gray-500">Payment Method</p>
          <p className="font-semibold text-gray-900">Cash on Delivery</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {orderId !== "N/A" && (
            <Link
              href={`/orders?orderId=${encodeURIComponent(String(orderId))}`}
              className="flex-1 rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Track Order
            </Link>
          )}

          <Link
            href="/products"
            className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
