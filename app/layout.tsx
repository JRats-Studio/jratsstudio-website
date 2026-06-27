import type { Metadata } from "next";
import { Alfa_Slab_One, Roboto } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { ClientSmoothScroll } from "@/components/layout/ClientSmoothScroll";
import { ClientPreloader } from "@/components/layout/ClientPreloader";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "JRat's Studio | AI Solutions & System Engineering",
  description: "Hackers of the humdrum. We forge bespoke neural architectures, engineer robust software ecosystems, create generative media, and construct secure data rooms.",
  keywords: ["AI Solutions", "Neural Architecture", "Software Dev", "System Engineering", "Generative Media", "Secure Data Rooms", "Autonomous Agents", "Custom CRMs"],
  openGraph: {
    title: "JRat's Studio | AI Solutions & System Engineering",
    description: "Hackers of the humdrum. We forge bespoke neural architectures, engineer robust software ecosystems, create generative media, and construct secure data rooms.",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { TechnicalGrid } from "@/components/effects/TechnicalGrid";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alfaSlabOne.variable} ${roboto.variable} antialiased bg-black`}
      >
        <ClientSmoothScroll>
          <ClientPreloader />
          <TechnicalGrid />
          <NoiseOverlay />
          <Navbar />
          {children}
        </ClientSmoothScroll>
      </body>
    </html>
  );
}
