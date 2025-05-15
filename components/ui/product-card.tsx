"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { Product } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-300",
                isHovered && "scale-110"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <p className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  Out of stock
                </p>
              </div>
            )}
          </div>
        </Link>
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/product/${product.id}`}
            className="font-medium hover:underline"
          >
            {product.name}
          </Link>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="ml-1 text-xs">{product.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">{formatPrice(product.price)}</p>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 rounded-full p-0"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
      {product.featured && (
        <div className="absolute left-2 top-2 z-10">
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}