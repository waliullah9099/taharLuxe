"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/product-detail";
import ProductRecommendations from "@/components/product/product-recommendations";
import ProductReviews from "@/components/product/product-reviews";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ProductPage({ params }: { params: { id: string } }) {
  const products = useAppSelector((state) => state.products.products);
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductDetail product={product} />
        <ProductReviews productId={product.id} />
        <ProductRecommendations 
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}