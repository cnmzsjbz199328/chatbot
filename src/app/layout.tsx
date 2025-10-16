import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from "@/QueryClientProvider"
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Personal Website | AI Assistant",
  description: "Personal portfolio website to showcase project experience and provide AI assistant services. Supports document uploading, intelligent conversation, and other features.",
  keywords: "Personal Website, Portfolio, AI Assistant, Full-Stack Development, Project Showcase",
  authors: [{ name: "Zhang San" }],
  icons: {
    icon: '/resume-logo.svg',
    shortcut: '/resume-logo.svg',
    apple: '/resume-logo.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
        <link rel="icon" href="/resume-logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <QueryClientProvider>
              {children}
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}