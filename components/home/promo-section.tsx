"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PromoSection() {
  const features = [
    "Premium quality materials",
    "Free shipping on orders over $100",
    "30-day money-back guarantee",
    "Sustainable and ethical production",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
            alt="Premium quality product"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Exceptional Quality, Remarkable Value
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              At TaharLuxe, we&lsquo;re committed to offering you the finest products that combine
              premium craftsmanship with contemporary design. Each item in our collection
              is thoughtfully sourced and rigorously tested to ensure exceptional quality.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="ml-3">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/products">Shop the Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}