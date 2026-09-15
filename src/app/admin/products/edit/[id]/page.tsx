"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/admin/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load product");
          return;
        }

        const product = data.product;

        setName(product.name);
        setPrice(String(product.price));
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description || "");
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setUpdating(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
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
        setError(data.message || "Failed to update product");
        return;
      }

      setMessage("Product updated successfully!");

      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading product...</p>
      </main>
    );
  }

  if (error && !name) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold text-red-600">
            {error}
          </h1>

          <button
            onClick={() => router.push("/admin/products")}
            className="mt-5 rounded-lg bg-black px-5 py-3 font-semibold text-white"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Product
            </h1>

            <p className="mt-2 text-gray-500">
              Update AmanMart product details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            {message && (
              <p className="rounded-lg bg-green-100 p-3 font-medium text-green-700">
                {message}
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-red-100 p-3 font-medium text-red-700">
                {error}
              </p>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="flex-1 rounded-lg border px-5 py-3 font-semibold transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="flex-1 rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
