"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return (
    <nav className="flex flex-col gap-4 border-b bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
      <Link
        href="/"
        className="text-2xl font-bold text-black"
      >
        AmanMart
      </Link>

      <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-gray-600">
        <Link
          href="/"
          className="transition hover:text-black"
        >
          Home
        </Link>

        <Link
          href="/products"
          className="transition hover:text-black"
        >
          Products
        </Link>

        <Link
          href="/categories"
          className="transition hover:text-black"
        >
          Categories
        </Link>

        <Link
          href="/orders"
          className="transition hover:text-black"
        >
          Track Order
        </Link>

        <Link
          href="/about"
          className="transition hover:text-black"
        >
          About
        </Link>
      </div>

      <Link
        href="/cart"
        className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
      >
        Cart ({cartCount})
      </Link>
    </nav>
  );
};

export default Navbar;
