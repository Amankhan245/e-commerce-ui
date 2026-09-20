"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Product = { _id: string; name: string; price: number; category: string; image: string; description?: string };

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

  useEffect(() => {
    fetch("/api/products").then((res) => res.json()).then((data) => setProducts(data.products || [])).catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  const handleQuantity = (id: string, change: number) => setQuantities((previous) => ({ ...previous, [id]: Math.max(1, (previous[id] || 1) + change) }));
  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product._id] || 1;
    addToCart({ productId: product._id, name: product.name, price: product.price, image: product.image, quantity });
    setAddedProduct(product._id);
    setTimeout(() => setAddedProduct(null), 1500);
  };
  const visibleProducts = products.filter((product) => !searchTerm || [product.name, product.category, product.description || ""].some((value) => value.toLowerCase().includes(searchTerm)));

  return <main className="min-h-screen bg-gray-50 px-4 py-8">
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Our Products</h1>
      {searchTerm && <p className="-mt-5 mb-5 text-sm text-gray-600">Showing results for <span className="font-semibold text-gray-900">&ldquo;{searchParams.get("search")}&rdquo;</span></p>}
      {visibleProducts.length === 0 ? <p className="text-gray-600">No products found.</p> : <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{visibleProducts.map((product) => {
        const quantity = quantities[product._id] || 1;
        return <div key={product._id} className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="h-64 w-full overflow-hidden bg-gray-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></div>
          <div className="p-3"><p className="text-xs font-medium uppercase text-gray-500">{product.category}</p><h2 className="mt-1 text-base font-bold capitalize text-gray-900">{product.name}</h2><p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p><p className="mt-3 text-lg font-bold text-gray-900">Rs. {product.price}</p><div className="mt-4 flex items-center justify-between gap-3"><div className="flex items-center rounded-md border"><button onClick={() => handleQuantity(product._id, -1)} className="px-2.5 py-1.5 hover:bg-gray-100">-</button><span className="px-3 text-sm font-semibold">{quantity}</span><button onClick={() => handleQuantity(product._id, 1)} className="px-2.5 py-1.5 hover:bg-gray-100">+</button></div><button onClick={() => handleAddToCart(product)} className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800">{addedProduct === product._id ? "Added" : "Add to Cart"}</button></div></div>
        </div>;
      })}</div>}
    </div>
  </main>;
}
