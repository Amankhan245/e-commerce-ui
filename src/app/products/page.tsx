"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

const product = {
  id: "1",
  name: "Classic T-Shirt",
  price: 999,
  rating: 4.5,
  image:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  description:
    "A comfortable and stylish classic T-shirt made for everyday wear.",
};

export default function ProductsPage() {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    setAddedToCart(true);

    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-xl bg-white p-4 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500">
                AMANMART
              </p>

              <h1 className="mt-1 text-xl font-bold text-gray-900">
                {product.name}
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                Rating: {product.rating}
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                Rs. {product.price}
              </p>
            </div>

          </div>

          <p className="mt-4 text-sm leading-5 text-gray-600">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center rounded-md border">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-3 text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {addedToCart ? "Added" : "Add to Cart"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}
