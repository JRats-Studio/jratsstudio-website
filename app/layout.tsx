import TargetCursor from "@/components/ui/TargetCursor";
import ClickSpark from "@/components/effects/ClickSpark";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { ClientSmoothScroll } from "@/components/layout/ClientSmoothScroll";
import { ClientPreloader } from "@/components/layout/ClientPreloader";

const outfit = Outfit({
  variable: "--font-alfa", // Kept mapping to prevent Tailwind theme changes
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
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

import { CosmicBackground } from "@/components/effects/CosmicBackground";
import { Dock } from "@/components/ui/Dock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-black`}
      >
        <TargetCursor />
        <ClickSpark />
        <Dock />

        <ClientSmoothScroll>
          <ClientPreloader />
          <CosmicBackground />
          <NoiseOverlay />
          {children}
        </ClientSmoothScroll>
      </body>
    </html>
  );
}