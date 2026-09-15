
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

 if (
  email === "amankhan83462@gmail.com" &&
  password === "admin123"
) {
  localStorage.setItem("amanmart-admin", "true");

  router.push("/admin/orders");
  return;
}

    setError("Invalid admin email or password");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            AmanMart Admin
          </h1>

          <p className="mt-2 text-gray-500">
            Login to manage orders
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@amanmart.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

