import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlannerProvider } from "@/context/PlannerContext";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Egypt Digital Treasures | Sovereign National Portal",
  description: "Experience the immortal legacy of Egypt through our unified national ecosystem of tourism, safety, and prosperity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${sansFont.variable} antialiased font-sans bg-white text-slate-900 selection:bg-primary selection:text-white`}
      >
        <PlannerProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </PlannerProvider>
      </body>
    </html>
  );
}
