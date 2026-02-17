import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Prabin Pandey - Finance, Data & AI Portfolio",
  description: "MS Financial Analysis candidate at Temple University.",
  keywords: "financial analysis, data science, AI, Prabin Pandey",
  openGraph: {
    title: "Prabin Pandey - Finance, Data & AI Portfolio",
    description: "MS Financial Analysis candidate at Temple University.",
    url: "https://www.prabin.com",
    siteName: "Prabin Pandey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabin Pandey - Finance, Data & AI Portfolio",
    description: "MS Financial Analysis candidate at Temple University.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabin Pandey",
              url: "https://www.prabin.com",
              jobTitle: "Financial Analyst",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Temple University",
              },
              sameAs: [
                "https://linkedin.com/in/prabinpandey",
                "https://github.com/prabinpandey",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Prabin Pandey Portfolio",
              url: "https://www.prabin.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
