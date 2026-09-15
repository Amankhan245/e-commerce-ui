"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setProductsLoading(true);
      setError("");

      const response = await fetch("/api/admin/products");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load products");
        return;
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading products");
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete product");
        return;
      }

      setMessage("Product deleted successfully!");

      await loadProducts();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while deleting product");
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
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
        setMessage(data.message || "Failed to add product");
        return;
      }

      setMessage("Product added successfully!");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setDescription("");

      await loadProducts();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Products
          </h1>

          <p className="mt-2 text-gray-500">
            Add and manage AmanMart products
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
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
                placeholder="Enter price"
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
                placeholder="e.g. clothes, shoes, electronics"
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
                placeholder="https://example.com/image.jpg"
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
                placeholder="Enter product description"
                rows={5}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            {message && (
              <p className="rounded-lg bg-gray-100 p-3 text-sm font-medium">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All Products
              </h2>

              <p className="mt-1 text-gray-500">
                Products stored in MongoDB
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
              {products.length} Products
            </span>
          </div>

          {productsLoading && (
            <p className="mt-8 text-gray-500">
              Loading products...
            </p>
          )}

          {error && (
            <p className="mt-8 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </p>
          )}

          {!productsLoading && !error && products.length === 0 && (
            <p className="mt-8 text-gray-500">
              No products found.
            </p>
          )}

          {!productsLoading && !error && products.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-xl border bg-white"
                >

                  <div className="flex h-52 items-center justify-center bg-gray-50 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="p-5">

                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xl font-bold">
                      ?{product.price}
                    </p>

                    <p className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                      {product.category}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      {product.description}
                    </p>

                      <button
                        onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                        className="mt-5 w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:opacity-90"
                      >
                        Edit Product
                      </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="mt-3 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}










