import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importamos los componentes
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp"; // <--- 1. Importación añadida

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AE&R CG SAC - Expertos en Tabiquería",
  description: "Especialistas en instalación de tabiquería armada y distribución de materiales Unicon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* El Navbar aparece en la parte superior de todas las páginas */}
        <Navbar />
        
        {/* El contenido de cada página se renderiza aquí */}
        <main>{children}</main>
        
        {/* El Footer aparece al final de todas las páginas */}
        <Footer />

        {/* El botón de WhatsApp flotante */}
        <Whatsapp /> {/* <--- 2. Componente añadido aquí */}
      </body>
    </html>
  );
}