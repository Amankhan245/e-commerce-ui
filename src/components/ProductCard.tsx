"use client";

import { useCart } from "@/context/CartContext";

type Props = { productId?: string; name: string; price: number; image: string; category?: string };

export default function ProductCard({ productId, name, price, image, category }: Props) {
  const { addToCart } = useCart();
  return <article className="group relative"><div className="relative flex aspect-[4/4.5] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#f1ede6] p-7"><img src={image} alt={name} className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-110" />{category && <span className="absolute left-4 top-4 rounded-full bg-[#fffdf9] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">{category}</span>}<button onClick={() => addToCart({ productId: productId || name, name, price, image, quantity: 1 })} className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-stone-950 text-xl text-white opacity-0 shadow-lg transition duration-300 hover:bg-[#e85d3f] group-hover:opacity-100" aria-label={`Add ${name} to cart`}>+</button></div><div className="px-1 pb-2 pt-4"><h3 className="line-clamp-1 text-base font-bold text-stone-900">{name}</h3><p className="mt-2 text-lg font-black text-stone-950">Rs. {Number(price).toLocaleString("en-IN")}</p><button onClick={() => addToCart({ productId: productId || name, name, price, image, quantity: 1 })} className="mt-3 text-sm font-bold text-[#c84a31] underline decoration-1 underline-offset-4 md:hidden">Add to cart</button></div></article>;
}
