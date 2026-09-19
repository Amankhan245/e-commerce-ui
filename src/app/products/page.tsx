"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedProduct, setAddedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const handleQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    setAddedProduct(product._id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Our Products
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const quantity = quantities[product._id] || 1;

              return (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-28 items-center justify-center bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[30px] w-[30px] object-contain"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-xs font-medium uppercase text-gray-500">
                      {product.category}
                    </p>

                    <h2 className="mt-1 text-base font-bold capitalize text-gray-900">
                      {product.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    <p className="mt-3 text-lg font-bold text-gray-900">
                      Rs. {product.price}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-md border">
                        <button
                          onClick={() =>
                            handleQuantity(product._id, -1)
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-100"
                        >
                          -
                        </button>

                        <span className="px-3 text-sm font-semibold">
                          {quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantity(product._id, 1)
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        {addedProduct === product._id
                          ? "Added"
                          : "Add to Cart"}
                      </button>
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
