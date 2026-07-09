import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Fitness Tracker",
  description: "A local-first fitness dashboard for weight, nutrition, workouts, and calorie targets."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={plusJakartaSans.variable} lang="en">
      <body className={plusJakartaSans.variable}>{children}</body>
    </html>
  );
}
