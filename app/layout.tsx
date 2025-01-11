"use client";

import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import { AuthProvider } from '@/lib/authContext'; // Import the AuthProvider
import { useEffect, useState } from "react";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  // Handle initial loading (e.g., for fetching user authentication status)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate a delay for loading
  }, []);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
