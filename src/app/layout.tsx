import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

type TRootLayout = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSansDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "Kira blog",
  description:
    "The AI-powered SAAS solution to generate SEO-optimized blog posts in minutes. Get high-quality content, without sacrificing your time.",
};

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <main
            className={`${inter.className} ${dmSans.variable} ${dmSansDisplay.variable} font-body`}
          >
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
