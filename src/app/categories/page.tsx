"use client";

import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Fashion",
    description: "Clothing, shoes and everyday style.",
  },
  {
    name: "Electronics",
    description: "Gadgets, devices and accessories.",
  },
  {
    name: "Home",
    description: "Useful products for your home.",
  },
  {
    name: "Accessories",
    description: "Complete your style with accessories.",
  },
];

export default function CategoriesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            AmanMart
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Shop by Category
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
            Explore our collection and find products that match your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => router.push("/")}
              className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold">
                {category.name.charAt(0)}
              </div>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                {category.name}
              </h2>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                {category.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-gray-900">
                Explore
              </p>
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}
