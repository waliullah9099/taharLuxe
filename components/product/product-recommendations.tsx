"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/redux/hooks";
import ProductCard from "../ui/product-card";

interface ProductRecommendationsProps {
  currentProductId: string;
  category: string;
}

export default function ProductRecommendations({
  currentProductId,
  category,
}: ProductRecommendationsProps) {
  const products = useAppSelector((state) => 
    state.products.products
      .filter(p => p.id !== currentProductId && p.category === category)
      .slice(0, 4)
  );

  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
        <p className="mt-2 text-muted-foreground">
          Customers who viewed this item also viewed
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}