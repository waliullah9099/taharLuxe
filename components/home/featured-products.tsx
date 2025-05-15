"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/product-card";
import { useAppSelector } from "@/lib/redux/hooks";

export default function FeaturedProducts() {
  const products = useAppSelector((state) => 
    state.products.products.filter(p => p.featured).slice(0, 4)
  );

  return (
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-muted-foreground">
              Our most popular items loved by customers
            </p>
          </div>
          <Button variant="link" size="sm" asChild className="mt-4 sm:mt-0">
            <Link href="/products">
              View all products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}