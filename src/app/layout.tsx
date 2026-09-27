import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profileData } from "@/data/profile";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://arjunbabu-saila.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profileData.name} | ${profileData.role}`,
    template: `%s | ${profileData.name}`,
  },
  description:
    "Portfolio of Arjunbabu Saila — Software Engineer focused on AI engineering, full-stack development and cybersecurity.",
  keywords: [
    "Arjunbabu Saila",
    "Software Engineer",
    "AI Engineering",
    "Full-Stack Development",
    "Cybersecurity",
    "SIEM",
    "Wazuh",
    "Elasticsearch",
    "Gemini AI",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Hyderabad Software Engineer",
  ],
  authors: [{ name: profileData.name, url: siteUrl }],
  creator: profileData.name,
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${profileData.name} | ${profileData.role}`,
    description:
      "Portfolio of Arjunbabu Saila — Software Engineer focused on AI engineering, full-stack development and cybersecurity.",
    siteName: `${profileData.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profileData.name} - Software Engineer | AI Engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | ${profileData.role}`,
    description:
      "Portfolio of Arjunbabu Saila — Software Engineer focused on AI engineering, full-stack development and cybersecurity.",
    images: ["/og-image.png"],
    creator: "@arjunbabu_saila",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profileData.name,
  jobTitle: profileData.role,
  description: profileData.heroDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Full-Stack Web Development",
    "Cybersecurity",
    "SIEM",
    "Incident Response",
    "Threat Hunting",
  ],
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#090c12] text-[#f8fafc] font-sans antialiased selection:bg-blue-600/30 selection:text-white min-h-screen flex flex-col transition-colors duration-200">
        <ThemeProvider>
          <SoundProvider>{children}</SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
