import type { Metadata } from "next";
import { Alfa_Slab_One, Roboto } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
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
  title: "JRat's Studio",
  description: "Hackers of the humdrum.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

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
        <SmoothScroll>
          <ClientPreloader />
          <NoiseOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
