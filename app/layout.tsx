import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, Bayon } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const bayon = Bayon({
  variable: "--font-bayon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mia Zhang - Tech Artist",
  description: "Portfolio of Mia Zhang - Technical Artist specializing in real-time VFX, procedural workflows, and game development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${bayon.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
