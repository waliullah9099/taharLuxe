import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Electronics",
    description: "Cutting-edge tech for modern living",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
    href: "/products?category=electronics",
    featured: true,
  },
  {
    name: "Fashion",
    description: "Premium apparel and accessories",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
    href: "/products?category=fashion",
    featured: false,
  },
  {
    name: "Home Decor",
    description: "Elevate your living space",
    image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg",
    href: "/products?category=home",
    featured: false,
  },
  {
    name: "Fitness",
    description: "Equipment for your wellness journey",
    image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg",
    href: "/products?category=fitness",
    featured: false,
  },
  {
    name: "Accessories",
    description: "Complete your personal style",
    image: "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg",
    href: "/products?category=accessories",
    featured: true,
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Browse by Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover products tailored to your lifestyle
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className={cn(
              "group relative overflow-hidden rounded-lg transition-all hover:shadow-md",
              category.featured && index === 0 && "sm:col-span-2 sm:row-span-2",
              category.featured && index === 4 && "lg:col-span-2"
            )}
          >
            <div
              className={cn(
                "relative aspect-square w-full",
                category.featured && index === 0 && "sm:aspect-[2/1]",
                category.featured && index === 4 && "lg:aspect-[2/1]"
              )}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}