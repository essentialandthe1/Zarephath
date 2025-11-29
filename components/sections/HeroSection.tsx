// components/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
<section
  id="home"
  className="relative bg-[#F7FAFC] py-30 px-6 lg:px-24"
>
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Left Text */}
    <div className="order-2 md:order-1">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        Freshly Processed Foods, Delivered <br className="hidden lg:block" />
        with Care.
      </h1>
      <p className="text-gray-700 text-lg lg:text-xl mb-8 max-w-xl">
        At <span className="text-green-800 font-bold">Zarephath Nigeria Ltd</span> Food Processing,
        we deliver premium-quality, locally sourced products, carefully-packaged,
        NAFDAC & FDA approved, and crafted to meet the highest standards.
      </p>

      <Button
        onClick={() => (window.location.href = "#products")}
        className="bg-green-700 hover:bg-green-800 text-white px-9 py-6 rounded-full text-sm font-semibold cursor-pointer"
      >
        Order Now →
      </Button>
    </div>

    {/* Right Image */}
    <div className="flex justify-center order-1 md:order-2">
      <Image
        src="/assets/banners/hero-section-banner.png"
        alt="hero"
        width={360}
        height={360}
        className="rounded-lg object-contain"
        priority
      />
    </div>
  </div>
</section>


  );
}
