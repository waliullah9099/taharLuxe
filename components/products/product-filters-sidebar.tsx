"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import { Check, Filter, X } from "lucide-react";

export default function ProductFiltersSidebar() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  
  const categories = useAppSelector((state) => state.products.categories);
  
  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`);
  };

  return (
    <div className="relative lg:block">
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button 
          variant="outline"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Filters</h3>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile filters content */}
            <div className="mt-6">
              <MobileFilters 
                categories={categories} 
                currentCategory={currentCategory} 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onCategoryClick={handleCategoryClick}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <DesktopFilters 
          categories={categories} 
          currentCategory={currentCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onCategoryClick={handleCategoryClick} 
        />
      </div>
    </div>
  );
}

interface FiltersProps {
  categories: string[];
  currentCategory: string | null;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  onCategoryClick: (category: string) => void;
  onClose?: () => void;
}

function MobileFilters({ 
  categories, 
  currentCategory, 
  priceRange,
  setPriceRange,
  onCategoryClick,
  onClose 
}: FiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium">Categories</h4>
        <div className="mt-3 space-y-3">
          <div className="flex items-center">
            <button
              onClick={() => {
                onCategoryClick("all");
                onClose?.();
              }}
              className={cn(
                "flex items-center space-x-2 text-sm",
                !currentCategory ? "font-medium text-primary" : "text-muted-foreground"
              )}
            >
              {!currentCategory && <Check className="h-4 w-4" />}
              <span>All Products</span>
            </button>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <button
                onClick={() => {
                  onCategoryClick(category);
                  onClose?.();
                }}
                className={cn(
                  "flex items-center space-x-2 text-sm",
                  currentCategory === category ? "font-medium text-primary" : "text-muted-foreground"
                )}
              >
                {currentCategory === category && <Check className="h-4 w-4" />}
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="mt-4">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={setPriceRange}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Availability</h4>
        <div className="mt-3 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock-mobile" />
            <label htmlFor="in-stock-mobile" className="text-sm">
              In stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale-mobile" />
            <label htmlFor="on-sale-mobile" className="text-sm">
              On sale
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button className="w-full" onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

function DesktopFilters({ 
  categories, 
  currentCategory, 
  priceRange,
  setPriceRange,
  onCategoryClick 
}: FiltersProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Categories</h3>
        <ul className="mt-3 space-y-2">
          <li>
            <Link
              href="/products"
              className={cn(
                "block py-1 text-sm",
                !currentCategory ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/products?category=${category}`}
                className={cn(
                  "block py-1 text-sm",
                  currentCategory === category ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="mt-4">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={setPriceRange}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Availability</h3>
        <div className="mt-3 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <label htmlFor="in-stock" className="text-sm">
              In stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <label htmlFor="on-sale" className="text-sm">
              On sale
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <Button variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>
    </div>
  );
}