"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSortingProps {
  onSort: (value: "price-asc" | "price-desc" | "rating" | "newest") => void;
}

export default function ProductSorting({ onSort }: ProductSortingProps) {
  const [value, setValue] = useState<string>("newest");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onSort(newValue as "price-asc" | "price-desc" | "rating" | "newest");
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}