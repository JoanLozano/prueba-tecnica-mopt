import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import 'keen-slider/keen-slider.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba Técnica MOPT",
  description: "desarrollo de prueba tecnica para el MOPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geist.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
