import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TanstackProvider from "@/providers/TansStackProvier";
import AuthContext from "@/providers/SessionProvider";
import { ToastProvider } from "@/providers/ToastProvider";
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
        <AuthContext>
            <TanstackProvider>
              <ToastProvider/>
              <Navbar />
              {children}
              <Footer />
            </TanstackProvider>
        </AuthContext>
      </body>
    </html>
  );
}
