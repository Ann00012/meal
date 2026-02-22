import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL|| "http://localhost:3000"
  ),
  title: "Meal",
  description: "Meal search site",
  icons:{ 
    icon:"./favicon.png"
  },
  openGraph: {
    title: "Meal",
    description: "Meal search site",
    url: "./",
    siteName: "Meal",
     images: [{
      url: '/meal.jpg',
      width: 1200,
      height: 630,
      alt:"Meal"
    }],
     type:"article"
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meal",
    description: "Meal",
    images: ["/meal.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            </main>
          <Footer/>
          </TanStackProvider>
      </body>
    </html>
  );
}
