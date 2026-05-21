import { Syne, Orbitron, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/CartContext";
import AudioEngine from "@/components/AudioEngine";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "XTC Lifestyle | Enter Your Higher State",
  description: "Beyond the physical. A synthesis of underground luxury and space-tech exploration for the culturally elevated.",
  keywords: "smoking papers, custom streetwear, music, luxury edc, bangalore, india, higher consciousness, techno nightlife",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${orbitron.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        <CartProvider>
          {children}
          <AudioEngine />
          <CustomCursor />
        </CartProvider>
      </body>
    </html>
  );
}
