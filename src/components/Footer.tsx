import Link from "next/link";

const footerLinks = {
  Shop: [["All products", "/products"], ["Categories", "/categories"], ["Your cart", "/cart"]],
  Categories: [["Fashion", "/categories"], ["Electronics", "/categories"], ["Home", "/categories"], ["Accessories", "/categories"]],
  Support: [["Track an order", "/orders"], ["About AmanMart", "/about"], ["My account", "/login"]],
};
export default function Footer() {
  return <footer className="bg-stone-950 text-stone-100"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]"><div><Link href="/" className="text-2xl font-black tracking-[-0.08em]">AmanMart</Link><p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">A considered marketplace for all the things that make everyday better.</p><div className="mt-6 flex gap-2"><span className="grid h-8 w-8 place-items-center rounded-full border border-stone-600 text-xs">in</span><span className="grid h-8 w-8 place-items-center rounded-full border border-stone-600 text-xs">ig</span><span className="grid h-8 w-8 place-items-center rounded-full border border-stone-600 text-xs">x</span></div></div>{Object.entries(footerLinks).map(([heading, links]) => <div key={heading}><h2 className="text-sm font-bold uppercase tracking-widest text-[#f7c4b6]">{heading}</h2><nav className="mt-4 grid gap-3">{links.map(([label, href]) => <Link key={label} href={href} className="text-sm text-stone-400 transition hover:text-white">{label}</Link>)}</nav></div>)}</div><div className="border-t border-stone-800 px-5 py-5 text-center text-xs text-stone-500">Copyright {new Date().getFullYear()} AmanMart. All rights reserved.</div></footer>;
}
