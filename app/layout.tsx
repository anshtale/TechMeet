import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from "@/lib/utils";

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
  title: "Team-Meet",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`,GeistMono.variable,GeistSans.variable,"overflow-y-auto")}
      >
        <NextTopLoader />
          <Providers>
            <Header/>
      
            {children}
        </Providers>
      </body>
    </html>
  );
}
