"use client";
import "@ant-design/v5-patch-for-react-19";
import "../styles/globals.css";
import { ConfigProvider } from "antd";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Web3Provider } from "../context/Web3Context";
import { UserProvider } from "../context/UserContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3dbf71",
          fontFamily: "var(--font-poppins)",
        },
      }}
    >
      <html lang="en" className={poppins.className}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" />
          <title>Blockchain Voting System</title>
          <link rel="icon" href="/logo.png" />
        </head>
        <body className="antialiased flex min-h-screen flex-col">
          <Web3Provider>
            <UserProvider>
              {!pathname.includes("login") && (
                <section className="w-full border-b border-gray-200 bg-white/70 backdrop-blur">
                  <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-3 select-none"
                      aria-label="Voting System Home"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center">
                        <Image
                          src="/logo.png"
                          width={26}
                          height={26}
                          alt="Voting System"
                        />
                      </div>
                      <div className="text-xl font-[600] tracking-tight">
                        Voting System
                      </div>
                    </Link>

                    {pathname === "/" && (
                      <Link href="/login" passHref>
                        <Button className="h-[45px] w-[120px] text-base">
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </section>
              )}
              {children}
            </UserProvider>
          </Web3Provider>
        </body>
      </html>
    </ConfigProvider>
  );
}
