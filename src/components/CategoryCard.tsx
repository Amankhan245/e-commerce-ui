const CategoryCard = ({ name }: { name: string }) => {
  return (
    <div className="group cursor-pointer rounded-2xl border bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl transition group-hover:bg-black group-hover:text-white">
        {name === "Fashion" && "👕"}
        {name === "Electronics" && "💻"}
        {name === "Home" && "🏠"}
        {name === "Accessories" && "⌚"}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{name}</h3>

      <p className="mt-2 text-sm text-gray-500">
        Explore {name} products
      </p>
    </div>
  );
};

export default CategoryCard;