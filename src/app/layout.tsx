import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/providers/CartProvider";
import { Toaster } from "@/components/ui/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Richie Gadgets | Technology, thoughtfully selected",
    template: "%s | Richie Gadgets",
  },
  description:
    "Discover smartphones, gaming systems, computers and everyday technology from brands you know and trust. Premium electronics retailer.",
  keywords: [
    "electronics",
    "smartphones",
    "iPhone",
    "Samsung",
    "PlayStation",
    "Xbox",
    "MacBook",
    "AirPods",
    "gaming",
    "tech store",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Richie Gadgets",
    title: "Richie Gadgets | Technology, thoughtfully selected",
    description:
      "Discover smartphones, gaming systems, computers and everyday technology from brands you know and trust.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
