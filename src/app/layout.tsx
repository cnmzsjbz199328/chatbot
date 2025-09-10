import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from "@/QueryClientProvider"
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "个人网站 | AI助手",
  description: "个人作品集网站，展示项目经验，提供AI智能助手服务。支持文档上传、智能对话等功能。",
  keywords: "个人网站, 作品集, AI助手, 全栈开发, 项目展示",
  authors: [{ name: "张三" }],
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
    <html lang="zh-CN">
      <head>
        <link 
          href="https://fonts.googleapis.com/icon?family=Material+Icons" 
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
