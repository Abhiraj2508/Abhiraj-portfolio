import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABHIRAJ.OS — Abhiraj Pratap Singh // DevOps Engineer",
  description:
    "Abhiraj Pratap Singh — DevOps Engineer. An explorable infrastructure: cloud, containers, CI/CD, Kubernetes, observability.",
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
