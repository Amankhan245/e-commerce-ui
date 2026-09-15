import { requireAdmin } from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await requireAdmin();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome, {user.name}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="mt-2 text-gray-500">
              Manage your products
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="mt-2 text-gray-500">
              Manage customer orders
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="mt-2 text-gray-500">
              Manage registered users
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}