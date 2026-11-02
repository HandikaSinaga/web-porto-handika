import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { PageTransitionProvider } from "@/context/PageTransitionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handika Juan Putra Sinaga | Cloud & DevOps Engineer",
  description:
    "Portofolio Handika Juan Putra Sinaga - Cloud Engineer & DevOps Engineer dengan spesialisasi AWS, Docker, CI/CD, Linux, dan Monitoring (Prometheus & Grafana).",
  keywords: [
    "Handika Juan Putra Sinaga",
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS",
    "Docker",
    "GitLab CI",
    "Prometheus",
    "Grafana",
    "Linux",
  ],
  authors: [{ name: "Handika Juan Putra Sinaga" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio_theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  var root = document.documentElement;
                  if (theme === 'dark') {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                  } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white`}
      >
        <ThemeProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
