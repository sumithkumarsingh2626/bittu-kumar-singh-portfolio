import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "Bittu Kumar Singh",
  description:
    "Portfolio of Bittu Kumar Singh, a Computer Science graduate focused on MERN stack development, AWS learning, Java, and building practical web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <body className="relative bg-[#050505] text-white overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
