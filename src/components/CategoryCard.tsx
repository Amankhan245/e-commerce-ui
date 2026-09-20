import Link from "next/link";

const styles: Record<string, { mark: string; color: string; label: string }> = {
  Fashion: { mark: "01", color: "bg-[#f5d5c8]", label: "Modern wardrobe" }, Electronics: { mark: "02", color: "bg-[#cbd8ec]", label: "Smart living" }, Home: { mark: "03", color: "bg-[#d9dfbf]", label: "Made for home" }, Accessories: { mark: "04", color: "bg-[#dfcbe7]", label: "Finishing touches" },
};
export default function CategoryCard({ name }: { name: string }) {
  const style = styles[name] || styles.Fashion;
  return <Link href="/categories" className="group relative block overflow-hidden rounded-[1.5rem] bg-stone-900 p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className={`absolute -right-7 -top-8 h-32 w-32 rounded-full ${style.color} transition duration-500 group-hover:scale-125`} /><span className="relative text-xs font-bold tracking-[0.2em] text-stone-300">{style.mark}</span><div className="relative mt-14"><p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{style.label}</p><h3 className="mt-2 text-2xl font-black tracking-tight">{name}</h3><span className="mt-6 inline-block text-sm font-bold text-[#f7c4b6] transition group-hover:translate-x-2">Explore collection -&gt;</span></div></Link>;
}
