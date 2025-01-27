"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

import { Layout, Typography, Button } from "antd";
import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#3dbf71",
                },
            }}
        >
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="description" />
                    <title>Blockchain Voting System</title>
                    <link rel="icon" href="/logo.png" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                </head>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <section className="pl-10 pr-10 bg-transparent border-b-2 flex h-[70px] items-center justify-between">
                        <div className="text-xl font-semibold">
                            Voting System
                        </div>
                        {pathname === "/" && (
                            <Link href="/login" passHref>
                                <Button className="h-[45px] w-[120px] text-base">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </section>
                    {children}
                </body>
            </html>
        </ConfigProvider>
    );
}
