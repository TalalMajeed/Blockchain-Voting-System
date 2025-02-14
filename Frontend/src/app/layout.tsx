"use client";
import "../styles/globals.css";
import { ConfigProvider } from "antd";

import { Button } from "antd";
import Link from "next/link";

import { usePathname } from "next/navigation";
//import { Poppins } from "next/font/google";
import { Web3Provider } from "../context/Web3Context";
import { UserProvider } from "../context/UserContext";

/*const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
*/
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
          fontFamily: "var(--font-poppins)",
        },
      }}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" />
          <title>Blockchain Voting System</title>
          <link rel="icon" href="/logo.png" />
        </head>
        <body className={`font-sans antialiased flex min-h-screen flex-col`}>
          <Web3Provider>
            <UserProvider>
              {!pathname.includes("login") && (
                <section className="pl-10 pr-10 bg-transparent border-b-2 flex h-[70px] items-center justify-between">
                  <div className="text-xl font-[500]">Voting System</div>
                  {pathname === "/" && (
                    <Link href="/login" passHref>
                      <Button className="h-[45px] w-[120px] text-base">
                        Login
                      </Button>
                    </Link>
                  )}
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
