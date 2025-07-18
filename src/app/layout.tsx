import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { QueryProvider, ThemeProvider } from "@/contexts";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer"],
});

export const metadata: Metadata = {
  title: "Pain Hub - Movie Browser",
  description: "Browse and discover movies using the YTS API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kantumruyPro.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
