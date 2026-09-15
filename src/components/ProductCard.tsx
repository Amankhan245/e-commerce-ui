"use client";

import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  name,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: name,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition duration-300 hover:scale-105"
        />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {name}
      </h3>

      <p className="mb-4 text-lg font-bold text-gray-900">
        Rs. {price}
      </p>

      <button
        onClick={handleAddToCart}
        className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
