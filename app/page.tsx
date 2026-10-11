import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Story } from "@/components/home/Story";
import { Newsletter } from "@/components/home/Newsletter";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Story />
      <Newsletter />
      <FinalCTA />
    </>
  );
}
