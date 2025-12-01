import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { allProducts } from "@/data/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zarephathfood.vercel.app"),
  title: {
    default: "Zarephath Nigerian Limited",
    template: "%s | Zarephath Nigerian Limited",
  },
  description:
    "Zarephath Nigerian Limited is a certified agribusiness company in Lagos, Nigeria, producing preservative-free foods like plantain flour, red palm oil, garri, and roasted peanuts. NAFDAC-compliant, export-ready, and trusted across Africa and beyond.",
  keywords: [
    "Zarephath",
    "Nigerian food company",
    "African agribusiness",
    "plantain flour Nigeria",
    "red palm oil",
    "garri Nigeria",
    "roasted peanuts",
    "NAFDAC certified",
    "healthy foods Africa",
    "export-ready food products",
  ],
  authors: [{ name: "Zarephath Nigerian Limited" }],
  creator: "Zarephath Nigerian Limited",
  publisher: "Zarephath Nigerian Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Zarephath Nigerian Limited",
    description:
      "Zarephath Nigerian Limited produces natural, preservative-free foods including unripe plantain flour, red palm oil, garri, and roasted peanuts. Trusted in Nigeria and beyond.",
    url: "https://zarephathfood.vercel.app",
    siteName: "Zarephath Nigerian Limited",
    images: [
      {
        url: "/seo-banner.png",
        width: 1200,
        height: 630,
        alt: "Zarephath Nigerian Limited - Natural Nigerian Food Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zarephath Nigerian Limited",
    description:
      "Export-ready Nigerian food company producing plantain flour, palm oil, garri, and roasted peanuts.",
    images: ["/seo-banner.png"],
  },
  alternates: {
    canonical: "https://zarephathfood.vercel.app",
  },
  icons: {
    icon: "/logo.svg",
  },
  other: {
  "theme-color": "#15803d", 
  "msapplication-TileColor": "#15803d",
 }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const orgSchema = {
    "@type": "Organization",
    "@id": "https://zarephathfood.vercel.app/#organization",
    name: "Zarephath Nigerian Limited",
    url: "https://zarephathfood.vercel.app",
    logo: "https://zarephathfood.vercel.app/logo.svg",
    description:
      "Zarephath Nigerian Limited is a certified agribusiness company in Lagos, Nigeria, producing preservative-free foods like plantain flour, red palm oil, garri, and roasted peanuts.",
    sameAs: [
      "https://www.facebook.com/profile.php?id=100044947973602",
      "https://www.instagram.com/zarephathfoods?igsh=MXRrMGV4bG9qb2I2cQ==",
      "https://www.tiktok.com/@zarephath.nigeria?_t=ZM-8z0WdNdV6S0&_r=1",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234 8037594488",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  };

  const productSchemas = allProducts.map((p) => ({
    "@type": "Product",
    name: p.name,
    image: p.images.map(
      (img) => `https://zarephathfood.vercel.app${img}`
    ),
    description: p.description,
    brand: {
      "@type": "Brand",
      name: "Zarephath Nigerian Limited",
    },
    offers: {
      "@type": "Offer",
      url: `https://zarephathfood.vercel.app/products/${p.id}`, // adjust if you use slugs
      priceCurrency: "NGN",
      price: p.price[0].replace(/[₦,]/g, ""), // take first price & strip ₦, commas
      availability: "https://schema.org/InStock",
    },
    aggregateRating: p.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: 20, // you can adjust if you have real reviews
        }
      : undefined,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [orgSchema, ...productSchemas],
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        {children}
         <Toaster />
      </body>
    </html>
  );
}
