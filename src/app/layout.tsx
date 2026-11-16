import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SK Laptop Store | Buy Smart. Work Smart.", description: "Explore new and used laptops from SK Laptop Store. Nationwide Pakistan service information and WhatsApp inquiries." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
