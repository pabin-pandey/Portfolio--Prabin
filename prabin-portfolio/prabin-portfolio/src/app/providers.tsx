"use client";

import React from "react";
import { ThemeProvider } from "@/lib/theme-provider";
import { ContentProvider } from "@/lib/content-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </ContentProvider>
    </ThemeProvider>
  );
}
