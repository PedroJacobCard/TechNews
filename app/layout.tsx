import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { NextAuthProvider } from "./components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechNews App",
  description: "Tech blog app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div
            className="bg-white dark:bg-zinc-800 lg:max-w-[900px] lg:px-16 mx-auto py-8 
          min-h-screen shadow-xl dark:shadow-darkBlue dark:shadow-lg flex flex-col px-8"
          >
            <NavBar />
            <div className="flex-auto">{children}</div>
            <Footer />
          </div>

          <Toaster/>
        </NextAuthProvider>
      </body>
    </html>
  );
}
