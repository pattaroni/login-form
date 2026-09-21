import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import "../styles/reset.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Login Form",
  description: "Homework",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
