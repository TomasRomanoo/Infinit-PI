import { Navbar } from "@/components/Navbar";
import "./globals.css";
import "@/assets/styles/swiperStyles.css"
import { Inter } from "next/font/google";


export const metadata = {
  title: "INFINIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full bg-gray-100 ">
        <Navbar />
        <div className="mt-40 mx-5 md:mx-12 lg:mx-20" id="home"> {children}</div>
      </body>
    </html>
  );
}
