import { Suspense } from "react";
import ProductList from "@/components/products/product-list";
import ProductListSkeleton from "@/components/products/product-list-skeleton";
import ProductFiltersSidebar from "@/components/products/product-filters-sidebar";

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // We can pre-render this page with default params at build time
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-6 pb-24">
          <h1 className="text-3xl font-bold tracking-tight">
            {category 
              ? `${category.charAt(0).toUpperCase()}${category.slice(1)} Products`
              : 'All Products'
            }
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <ProductFiltersSidebar />
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}