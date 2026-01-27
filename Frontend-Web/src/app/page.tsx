"use client";

import { Layout, Typography, Button } from "antd";

import Image from "next/image";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  return (
    <Layout className="min-h-[100%] font-sans">
      <Content className="flex flex-col items-center justify-center gap-[10px]">
        <Image src="/logo.png" width={100} height={100} alt="Logo"></Image>
        <div className="text-[2rem] text-center mt-[50px] font-medium">
          Welcome to a decentralized Voting System
        </div>
        <div className="text-2xl font-light">Powered by Ganache & Truffle</div>
      </Content>
      <Footer className="text-center text-base font-light text-gray-600">
        Voting System ©2025 | All Rights Reserved
      </Footer>
    </Layout>
  );
}
