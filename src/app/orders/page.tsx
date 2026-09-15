"use client";

import { useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  items: OrderItem[];
};

const statusSteps = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
];

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const response = await fetch(
        `/api/orders/${orderId.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch order"
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Track Order Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to find order"
      );
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = order?.status || "Pending";
  const currentStepIndex = statusSteps.indexOf(currentStatus);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Track Your Order
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your Order ID to check your order status.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
          />

          <button
            onClick={findOrder}
            disabled={loading}
            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h2 className="mt-1 break-all text-lg font-bold">
                {order._id}
              </h2>

              <p className="mt-4 text-sm text-gray-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold">
                Rs. {order.totalAmount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Order Status
              </h2>

              <div className="mt-8">
                {statusSteps.map((status, index) => {
                  const completed =
                    currentStepIndex >= index;

                  const isCurrent =
                    currentStatus === status;

                  return (
                    <div
                      key={status}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                            completed
                              ? "bg-black text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {index < statusSteps.length - 1 && (
                          <div
                            className={`h-12 w-0.5 ${
                              currentStepIndex > index
                                ? "bg-black"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      <div className="pb-8">
                        <h3
                          className={`font-semibold ${
                            completed
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          {status}
                        </h3>

                        {isCurrent && (
                          <p className="mt-1 text-sm text-gray-500">
                            Current order status
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentStatus === "Cancelled" && (
                <div className="rounded-xl bg-red-50 p-4 text-red-600">
                  This order has been cancelled.
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Delivery Details
              </h2>

              <div className="mt-4 space-y-2 text-gray-600">
                <p>
                  <strong>Name:</strong> {order.name}
                </p>

                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>

                <p>
                  <strong>Address:</strong> {order.address}
                </p>

                <p>
                  <strong>City:</strong> {order.city}
                </p>

                <p>
                  <strong>Pincode:</strong> {order.pincode}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod || "COD"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Ordered Products
              </h2>

              <div className="mt-4 space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Rs. {item.price} x {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      Rs.{" "}
                      {Number(item.price) *
                        Number(item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
