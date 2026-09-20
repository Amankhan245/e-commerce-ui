"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const navigation = [
  { href: "/", label: "Home" }, { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" }, { href: "/orders", label: "Track Order" }, { href: "/about", label: "About" },
];

const CartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true"><path d="M3 4h2l2 11h11l2-8H6" /><path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>;

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => { fetch("/api/auth/me").then((r) => r.ok ? r.json() : null).then((data) => setUser(data?.user ?? null)).catch(() => setUser(null)); }, [pathname]);
  useEffect(() => setIsOpen(false), [pathname]);
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); router.push(`/products${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`); };

  return <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffdf9]/95 backdrop-blur-md">
    <div className="mx-auto flex h-20 max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
      <Link href="/" className="flex items-center gap-2.5 text-xl font-black tracking-[-0.08em] text-stone-950" aria-label="AmanMart home"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e85d3f] font-serif text-xl text-white shadow-[3px_3px_0_#211d1b]">A</span><span>AmanMart</span></Link>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex" aria-label="Primary navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className={`relative py-2 text-sm font-semibold transition ${isActive(item.href) ? "text-stone-950" : "text-stone-500 hover:text-stone-950"}`}>{item.label}{isActive(item.href) && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e85d3f]" />}</Link>)}</nav>
      <div className="ml-auto flex items-center gap-2 sm:gap-3"><form onSubmit={submitSearch} className="hidden items-center border-b border-stone-300 py-1.5 md:flex focus-within:border-stone-950"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-stone-500"><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></svg><input aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-24 bg-transparent px-2 text-sm outline-none lg:w-32" /></form><Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-full border border-stone-300 text-stone-900 transition hover:border-stone-950 hover:bg-stone-950 hover:text-white" aria-label={`Cart with ${cartCount} items`}><CartIcon />{cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#e85d3f] px-1 text-[10px] font-bold text-white">{cartCount}</span>}</Link>{user ? <span className="hidden text-sm font-bold text-stone-800 sm:block">Hi, {user.name?.split(" ")[0] || "there"}</span> : <Link href="/login" className="hidden rounded-full bg-stone-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#e85d3f] sm:block">Log in</Link>}<button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 lg:hidden"><span className="space-y-1.5">{[1, 2, 3].map((line) => <i key={line} className="block h-px w-4 bg-stone-900" />)}</span></button></div>
    </div>
    {isOpen && <div className="border-t border-stone-200 bg-[#fffdf9] px-5 py-5 lg:hidden"><form onSubmit={submitSearch} className="mb-4 flex items-center border-b border-stone-300"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="w-full bg-transparent py-3 outline-none" /></form><nav className="grid gap-1">{navigation.map((item) => <Link key={item.href} href={item.href} className={`px-2 py-2.5 text-sm font-bold ${isActive(item.href) ? "text-[#e85d3f]" : "text-stone-800"}`}>{item.label}</Link>)}{!user && <Link href="/signup" className="mt-2 rounded-full bg-stone-950 px-4 py-3 text-center text-sm font-bold text-white">Create account</Link>}</nav></div>}
  </header>;
}
