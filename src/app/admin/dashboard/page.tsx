"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  _id?: string;
  id?: string;
  totalAmount?: number;
  status?: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("amanmart-admin");

    if (isAdmin !== "true") {
      router.push("/admin-login");
      return;
    }

    const loadOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();

        const orderList = Array.isArray(data)
          ? data
          : data.orders || [];

        setOrders(orderList);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [router]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
    },
    {
      title: "Pending",
      value: pendingOrders,
    },
    {
      title: "Confirmed",
      value: confirmedOrders,
    },
    {
      title: "Shipped",
      value: shippedOrders,
    },
    {
      title: "Delivered",
      value: deliveredOrders,
    },
    {
      title: "Cancelled",
      value: cancelledOrders,
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-6 text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome to AmanMart admin panel.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/orders")}
            className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Manage Orders
          </button>
        </div>

        {/* Revenue */}
        <div className="mb-6 rounded-2xl bg-black p-6 text-white shadow-sm">
          <p className="text-sm text-gray-300">
            Total Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹{totalRevenue}
          </h2>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest customer orders
              </p>
            </div>

            <button
              onClick={() => router.push("/admin/orders")}
              className="text-sm font-semibold underline"
            >
              View All
            </button>
          </div>

          {orders.length === 0 ? (
            <p className="mt-6 text-gray-500">
              No orders found.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div
                  key={order._id || order.id || index}
                  className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Order #
                      {order._id ||
                        order.id ||
                        index + 1}
                    </p>

                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      {order.status || "Pending"}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{order.totalAmount || 0}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}