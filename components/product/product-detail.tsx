"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  RefreshCcw, 
  Shield 
} from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const [mainImage, setMainImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        selectedColor,
        selectedSize,
      })
    );
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Product images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image) => (
            <button
              key={image}
              onClick={() => setMainImage(image)}
              className={`relative aspect-square overflow-hidden rounded-md ${
                mainImage === image
                  ? "ring-2 ring-primary ring-offset-2"
                  : "ring-1 ring-muted"
              }`}
            >
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
        </motion.div>

        <div className="space-y-6">
          {/* Color selector */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium">Color</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`relative h-8 w-8 rounded-full border ${
                      selectedColor === color
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color: ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Size</h3>
                <Button variant="link" size="sm" className="text-xs">
                  Size guide
                </Button>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium ${
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted text-muted-foreground hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <h3 className="text-sm font-medium">Quantity</h3>
            <div className="mt-2 flex w-24 items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setQuantity(val);
                  }
                }}
                className="w-full border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min={1}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to cart button */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Heart className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">
                Add to Wishlist
              </span>
            </Button>
          </div>

          {/* Shipping info */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center text-sm">
              <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
              Free shipping on orders over $100
            </div>
            <div className="flex items-center text-sm">
              <RefreshCcw className="mr-2 h-4 w-4 text-muted-foreground" />
              Free 30-day returns
            </div>
            <div className="flex items-center text-sm">
              <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
              2-year warranty
            </div>
          </div>

          {/* Product details accordions */}
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam, augue sed tincidunt bibendum, mi turpis faucibus magna, nec finibus lectus enim in ipsum. Sed vestibulum nisl at faucibus ultrices.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Premium materials</li>
                  <li>Handcrafted with attention to detail</li>
                  <li>Made to last</li>
                  <li>Designed in the USA</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  We offer free standard shipping on all orders over $100. Delivery typically takes 3-5 business days. Expedited shipping options are available at checkout.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We accept returns within 30 days of delivery. Items must be unused and in original packaging.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  To ensure the longevity of your product, please follow these care instructions:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Handle with care</li>
                  <li>Clean with a soft, dry cloth</li>
                  <li>Avoid exposure to extreme temperatures</li>
                  <li>Store in a cool, dry place when not in use</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}