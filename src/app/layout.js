import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";


export const metadata = {
  title: "INFINIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full bg-[#fbfbfb] ">
        <Navbar />
        <div className="mt-40"> {children}</div>
      </body>
    </html>
  );
}
