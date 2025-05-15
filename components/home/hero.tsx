"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-primary">New Collection</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Elevate Your Style
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our curated collection of premium products designed for modern living.
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">Explore Categories</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}