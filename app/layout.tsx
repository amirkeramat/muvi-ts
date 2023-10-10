import Container from "@/components/ui/Container";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MUVI",
  description: "MUVI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Navbar />
          <main className="h-full flex-1">{children}</main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
