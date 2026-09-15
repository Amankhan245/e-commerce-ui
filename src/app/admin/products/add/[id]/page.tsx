"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("amanmart-admin");

    if (isAdmin !== "true") {
      router.push("/admin-login");
      return;
    }

    const loadProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/${productId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product"
          );
        }

        const currentProduct = data.product;

        setProduct(currentProduct);

        setName(currentProduct.name || "");
        setPrice(String(currentProduct.price || ""));
        setCategory(currentProduct.category || "");
        setImage(currentProduct.image || "");
        setDescription(
          currentProduct.description || ""
        );
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, router]);

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
      setSaving(true);

      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "PATCH",
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      alert("Product updated successfully!");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="mt-6 text-gray-600">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold">
              Product Not Found
            </h1>

            <p className="mt-2 text-gray-500">
              {error || "This product does not exist."}
            </p>

            <button
              onClick={() =>
                router.push("/admin/products")
              }
              className="mt-6 rounded-xl bg-black px-5 py-3 font-semibold text-white"
            >
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-600">
            Update your product information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            {/* Product Name */}
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                min="0"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                disabled={saving}
                className="flex-1 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
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