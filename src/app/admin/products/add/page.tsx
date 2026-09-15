"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!name || !price || !category || !image) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          category,
          image,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      alert("Product added successfully!");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Product
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new product to AmanMart.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter product name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="Enter price"
                min="0"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="e.g. Clothing, Electronics"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
                placeholder="https://example.com/product.jpg"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Enter product description"
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Adding Product..."
                  : "Add Product"}
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/admin/products")
                }
                className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}