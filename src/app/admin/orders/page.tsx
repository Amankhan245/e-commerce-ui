
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  totalAmount?: number;
  paymentMethod?: string;
  status?: string;
  items?: OrderItem[];
};

const statusOptions = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

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

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
        }

        const orderList = Array.isArray(data)
          ? data
          : data.orders || [];

        setOrders(orderList);
      } catch (error) {
        console.error(error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("amanmart-admin");
    router.push("/admin-login");
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      setUpdatingOrder(orderId);

      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update order status"
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((currentOrder) => {
          const currentId =
            currentOrder._id || currentOrder.id;

          if (currentId === orderId) {
            return {
              ...currentOrder,
              status: newStatus,
            };
          }

          return currentOrder;
        })
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update order status"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            Admin Orders
          </h1>

          <p className="mt-6 text-gray-600">
            Loading orders...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            Admin Orders
          </h1>

          <div className="mt-6 rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Admin Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Admin Orders
            </h1>

            <p className="mt-2 text-gray-600">
              Manage customer orders.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no orders available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const orderId =
                order._id || order.id || "";

              const currentStatus =
                order.status || "Pending";

              return (
                <div
                  key={orderId || index}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  {/* Order Header */}
                  <div className="flex flex-col justify-between gap-5 border-b pb-5 md:flex-row">
                    <div>
                      <h2 className="text-xl font-bold">
                        Order #
                        {order._id ||
                          order.id ||
                          index + 1}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Payment:{" "}
                        {order.paymentMethod ||
                          "Cash on Delivery"}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-xl font-bold">
                        ₹{order.totalAmount || 0}
                      </p>

                      {/* Status Dropdown */}
                      <div className="mt-2">
                        <select
                          value={currentStatus}
                          disabled={
                            updatingOrder === orderId
                          }
                          onChange={(event) =>
                            updateOrderStatus(
                              orderId,
                              event.target.value
                            )
                          }
                          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {statusOptions.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>

                        {updatingOrder === orderId && (
                          <p className="mt-1 text-xs text-gray-500">
                            Updating...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer + Products */}
                  <div className="grid gap-6 py-5 md:grid-cols-2">

                    {/* Customer Details */}
                    <div>
                      <h3 className="font-semibold">
                        Customer Details
                      </h3>

                      <div className="mt-3 space-y-2 text-gray-600">
                        <p>
                          <strong>Name:</strong>{" "}
                          {order.name || "N/A"}
                        </p>

                        <p>
                          <strong>Phone:</strong>{" "}
                          {order.phone || "N/A"}
                        </p>

                        <p>
                          <strong>Address:</strong>{" "}
                          {order.address || "N/A"}
                        </p>

                        <p>
                          <strong>City:</strong>{" "}
                          {order.city || "N/A"}
                        </p>

                        <p>
                          <strong>Pincode:</strong>{" "}
                          {order.pincode || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Ordered Products */}
                    <div>
                      <h3 className="font-semibold">
                        Ordered Products
                      </h3>

                      <div className="mt-3 space-y-3">
                        {order.items?.map(
                          (item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex justify-between gap-4 border-b pb-2"
                            >
                              <span className="text-gray-600">
                                {item.name} ×{" "}
                                {item.quantity}
                              </span>

                              <span className="font-medium">
                                ₹
                                {Number(item.price) *
                                  Number(item.quantity)}
                              </span>
                            </div>
                          )
                        )}

                        {!order.items?.length && (
                          <p className="text-gray-500">
                            No product details available.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

