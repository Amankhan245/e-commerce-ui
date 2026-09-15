"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
};

export default function Homepage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row">

          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-block rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
              Welcome to AmanMart
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need,
              <span className="block text-gray-500">
                all in one place.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg lg:mx-0">
              Discover quality products at amazing prices. Shop fashion,
              electronics, home essentials and more.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={() => router.push("/products")}
                className="rounded-xl bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl"
              >
                Shop Now ?
              </button>

              <button
                onClick={() => router.push("/categories")}
                className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-900 transition duration-200 hover:bg-gray-100"
              >
                Explore Categories
              </button>
            </div>
          </div>

          <div className="flex h-64 w-64 shrink-0 items-center justify-center rounded-[2rem] bg-black shadow-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div className="text-center text-white">
              <div className="text-7xl">???</div>
              <p className="mt-4 text-sm font-semibold tracking-widest">
                SHOP SMART
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Explore
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Shop by Category
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-500">
              Find the products you need across our popular categories.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard name="Fashion" />
            <CategoryCard name="Electronics" />
            <CategoryCard name="Home" />
            <CategoryCard name="Accessories" />
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 px-6 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Our Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => router.push("/products")}
              className="w-fit font-semibold text-gray-700 transition hover:text-black"
            >
              View All ?
            </button>
          </div>

          {loading ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <p className="font-semibold text-gray-700">
                No products available.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Products will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-black px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Explore our products and find something you will love.
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-7 rounded-xl bg-white px-7 py-3.5 font-semibold text-black transition hover:bg-gray-200"
          >
            Browse Products
          </button>
        </div>
      </section>

    </main>
  );
}
