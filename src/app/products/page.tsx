import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="mx-auto w-full max-w-6xl text-gray-600">
            Loading products...
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
