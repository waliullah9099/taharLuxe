"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { filterByCategory, sortProducts } from "@/lib/redux/features/products/productSlice";
import ProductCard from "@/components/ui/product-card";
import ProductSorting from "@/components/products/product-sorting";
import { motion } from "framer-motion";

interface ProductListProps {
  category?: string;
}

export default function ProductList({ category }: ProductListProps) {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(
    (state) => state.products.filteredProducts
  );

  useEffect(() => {
    if (category) {
      dispatch(filterByCategory(category));
    } else {
      dispatch(filterByCategory("all"));
    }
  }, [category, dispatch]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredProducts.length}</span>{" "}
          products
        </p>
        <ProductSorting
          onSort={(value) => dispatch(sortProducts(value))}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
}