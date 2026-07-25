import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";
import "./hero-animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FTP — FaisToiPlaisir | Rédaction de Rapports de Stage",
  description:
    "FTP (FaisToiPlaisir) est votre partenaire pour la rédaction professionnelle de rapports de stage et présentations PowerPoint. Service premium, confidentiel et rapide.",
  keywords: [
    "rapport de stage",
    "rédaction rapport",
    "PowerPoint soutenance",
    "aide rédaction",
    "rapport professionnel",
    "FTP",
    "FaisToiPlaisir",
  ],
  openGraph: {
    title: "FTP — FaisToiPlaisir | Rédaction de Rapports de Stage",
    description:
      "Votre rapport de stage rédigé par un expert. Service professionnel, confidentiel et rapide.",
    type: "website",
    locale: "fr_FR",
    siteName: "FTP - FaisToiPlaisir",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
