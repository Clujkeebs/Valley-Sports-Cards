import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://valleysportscards.example.com"),
  title: {
    default: `${business.name} | Herkimer & Cooperstown, NY`,
    template: `%s | ${business.name}`,
  },
  description:
    "The Valley Sports Cards & Collectibles has two Mohawk Valley locations — Herkimer and Cooperstown, NY, home of the Baseball Hall of Fame. Shop baseball, football, basketball, and hockey cards, memorabilia, and collecting supplies in-store or on eBay.",
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/icon-512.png",
  },
  openGraph: {
    title: business.name,
    description: business.tagline,
    images: ["/images/valley-sports-cards-logo-flat.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
