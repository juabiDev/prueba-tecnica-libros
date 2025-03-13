import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba Tecnica Libros",
  description: "📚 Librería",
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
        <main className="p-5 m-auto max-w-screen-lg grid min-h-screen grid-rows-[60px, 1fr, 60px] gap-4">
          <nav className="flex items-center text-2xl">📚 Librería</nav>
          <section>
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
