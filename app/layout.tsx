import {
  ClerkProvider,
} from '@clerk/nextjs'
import type { Metadata } from "next";
import localFont         from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import Providers from "./providers";
// import { QueryClient } from "@tanstack/react-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Todo App",
  // description: "AI Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
