import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/components/ui/fonts";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Talent app",
  description: "Created by Salt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased overscroll-none p-0`}>
          <div className="space-y-8">
            <Header />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
