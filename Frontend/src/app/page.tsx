"use client";

import { Layout, Typography, Button } from "antd";
import Link from "next/link";

import Image from "next/image";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
    return (
        <Layout className="min-h-screen font-sans">
            <Header className="bg-transparent border-b-2 flex h-[70px] items-center justify-between">
                <div className="text-xl font-semibold">Voting System</div>
                <Button className="h-[45px] w-[120px] text-base">Login</Button>
            </Header>
            <Content className="flex flex-col items-center justify-center gap-[10px]">
                <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                ></Image>
                <Title className="text-center mt-[50px]">
                    Welcome to a decentralized Voting System
                </Title>
                <div className="text-2xl">Powered by Ganache & Truffle</div>
            </Content>
            <Footer className="text-center text-base">
                Voting System ©2025 | All Rights Reserved
            </Footer>
        </Layout>
    );
}
