"use client";

import { Layout, Typography } from "antd";
const { Content, Footer } = Layout;

export default function Verify() {
    return (
        <Layout className="min-h-screen font-sans">
            <Content className="flex flex-col items-center justify-center gap-[10px]"></Content>
            <Footer className="text-center text-base">
                Voting System ©2025 | All Rights Reserved
            </Footer>
        </Layout>
    );
}
