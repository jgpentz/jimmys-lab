import type { Metadata } from "next";

import "./globals.css";

import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Network Engineering Labs",
    template: "%s | Network Engineering Labs"
  },
  description:
    "A portfolio of network engineering lab case studies covering routing, automation, benchmarking, and design validation.",
  keywords: ["network engineering", "labs", "BGP", "OSPF", "automation", "RFC2544"],
  openGraph: {
    title: "Network Engineering Labs",
    description:
      "Technical case studies documenting routing, automation, and performance validation labs.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Engineering Labs",
    description:
      "Technical case studies documenting routing, automation, and performance validation labs."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
