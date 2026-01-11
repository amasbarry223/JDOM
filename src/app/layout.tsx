import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JDOM - Jeux de Données Ouverts du Mali",
  description: "Plateforme nationale de données ouvertes du Mali. Accédez librement aux données publiques pour innover et décider.",
  keywords: [
    "JDOM",
    "Mali",
    "Données ouvertes",
    "Open Data",
    "Données publiques",
    "Transparence",
    "Innovation",
  ],
  authors: [{ name: "JDOM Team" }],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "JDOM - Jeux de Données Ouverts du Mali",
    description: "Plateforme nationale de données ouvertes du Mali. Accédez librement aux données publiques pour innover et décider.",
    url: "https://jdom.ml",
    siteName: "JDOM",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "JDOM - Jeux de Données Ouverts du Mali",
    description: "Plateforme nationale de données ouvertes du Mali",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
