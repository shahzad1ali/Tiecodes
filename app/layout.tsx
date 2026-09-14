import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | Fleet Management, GPS Tracking & Logistics Software`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  metadataBase: new URL("https://tiecodes.com"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: company.name,
    description: company.headline,
    type: "website",
    locale: "en_US",
    siteName: company.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${company.name} — fleet, GPS, and logistics software`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.headline,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
