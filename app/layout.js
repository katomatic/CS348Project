import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "March Madness 2024",
  description: "March Madness 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-10 p-4">
          <Navbar />
          <div className="mt-8">{children}</div>
          
        </div>
      </body>
    </html>
  );
}
