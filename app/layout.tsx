import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhiraj.dev"),
  title: "Abhiraj Pratap Singh | Aspiring DevOps Engineer & Web Developer",
  description:
    "Recruiter-ready portfolio of Abhiraj Pratap Singh — Aspiring DevOps Engineer & Web Developer. Hands-on projects in Kubernetes, Docker, Jenkins CI/CD pipelines, React, Linux, and Cloud fundamentals.",
  keywords: [
    "Abhiraj Pratap Singh",
    "DevOps Engineer",
    "Web Developer",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "CI/CD Pipeline",
    "React Developer",
    "Linux",
    "Prometheus",
    "Grafana",
    "Minikube",
    "Portfolio",
  ],
  authors: [{ name: "Abhiraj Pratap Singh" }],
  creator: "Abhiraj Pratap Singh",
  openGraph: {
    title: "Abhiraj Pratap Singh | Aspiring DevOps Engineer & Web Developer",
    description:
      "Explore automated CI/CD pipelines, Kubernetes container orchestration, and interactive DevOps systems built by Abhiraj Pratap Singh.",
    url: "https://github.com/Abhiraj2508",
    siteName: "ABHIRAJ.OS Portfolio",
    images: [
      {
        url: "/kubernetes-monitoring.png",
        width: 1280,
        height: 720,
        alt: "Abhiraj Pratap Singh Portfolio - DevOps and Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/avatar.jpg",
    shortcut: "/avatar.jpg",
    apple: "/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
