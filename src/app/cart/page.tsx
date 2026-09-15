
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-600">
            Add some products to your cart first.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

          <button
            onClick={clearCart}
            className="text-red-500 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 md:col-span-2">

            {cart.map((item) => {
              const price = Number(item.price);
              const quantity = Number(item.quantity);

              return (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
                >

                  {/* Small Product Image */}
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">

                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-1">
                      ₹{price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            quantity - 1
                          )
                        }
                        disabled={quantity <= 1}
                        className="rounded border px-3 py-1 disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="font-medium">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            quantity + 1
                          )
                        }
                        className="rounded border px-3 py-1"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(item.productId)
                        }
                        className="ml-3 text-red-500 hover:underline"
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="font-bold">
                    ₹{price * quantity}
                  </div>

                </div>
              );
            })}

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="mt-3 flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="my-5 border-t" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-black px-6 py-3 text-center font-medium text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

