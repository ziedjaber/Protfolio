import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

/* ── Premium Font Stack ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Zied Jabeur | Software Engineering Student",
  description:
    "Top-ranked Software Engineering student with experience building web, mobile, and AI-powered applications. Awarded Best Final Year Project (19.5/20) and recognized for academic excellence.",
  keywords: [
    "Software Engineering Student",
    "Full-Stack Developer",
    "Mobile Developer",
    "AI Developer",
    "Spring Boot Developer",
    "Angular Developer",
    "Mohamed Zied Jabeur",
    "Tunisia Developer",
  ],
  authors: [{ name: "Mohamed Zied Jabeur" }],
  creator: "Mohamed Zied Jabeur",
  metadataBase: new URL("https://mohamedziedjabeur.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Zied Jabeur | Software Engineering Student",
    description:
      "Top-ranked Software Engineering student with experience building web, mobile, and AI-powered applications. Awarded Best Final Year Project (19.5/20).",
    url: "https://mohamedziedjabeur.dev",
    siteName: "Mohamed Zied Jabeur Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mohamed Zied Jabeur Portfolio Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Zied Jabeur | Software Engineering Student",
    description: "Top-ranked Software Engineering student with experience building web, mobile, and AI-powered applications.",
    images: ["/og-image.png"],
    creator: "@ziedjabeur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#030014",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Zied Jabeur",
    jobTitle: "Software Engineering Student",
    url: "https://mohamedziedjabeur.dev",
    email: "mailto:mohamedziedjabeur@gmail.com",
    telephone: "+21628150013",
    address: { "@type": "PostalAddress", addressLocality: "Sfax", addressCountry: "Tunisia" },
    sameAs: [
      "https://github.com/ziedjaber",
      "https://linkedin.com/in/mohamed-zied-jabeur",
    ],
    knowsAbout: ["Software Engineering","Full-Stack Development","Mobile Development","Artificial Intelligence","Spring Boot","Angular","React","Next.js","Node.js","Agile Scrum"],
    alumniOf: [
      { "@type": "EducationalOrganization", name: "ISIMS Sfax" },
      { "@type": "EducationalOrganization", name: "ISET Tataouine" },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased text-foreground min-h-screen flex flex-col justify-between`}
        style={{ background: "#030014" }}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
