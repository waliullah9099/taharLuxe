import Hero from "@/components/home/hero";
import FeaturedProducts from "@/components/home/featured-products";
import CategoryGrid from "@/components/home/category-grid";
import PromoSection from "@/components/home/promo-section";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12 md:space-y-24">
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <PromoSection />
      <Newsletter />
    </div>
  );
}