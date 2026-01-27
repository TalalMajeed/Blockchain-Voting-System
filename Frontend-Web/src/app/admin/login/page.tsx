"use client";

import { Layout, Button, Form, message } from "antd";
import { useEffect } from "react";
import Web3 from "web3";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/context/Web3Context";

const { Content, Footer } = Layout;

export default function AdminLogin() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const { account, isConnecting, setAccount, setIsConnecting, setWeb3 } =
    useWeb3();

  const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    }
  }, [setWeb3]);

  useEffect(() => {
    if (!account || !ownerAddress) return;
    if (account.toLowerCase() === ownerAddress.toLowerCase()) {
      router.replace("/panel/admin");
    }
  }, [account, ownerAddress, router]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      messageApi.error("MetaMask is not installed.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const selected = accounts?.[0];
      if (!selected) {
        messageApi.error("No wallet selected.");
        return;
      }

      if (!ownerAddress) {
        messageApi.error("Missing NEXT_PUBLIC_OWNER_ADDRESS.");
        return;
      }

      if (selected.toLowerCase() !== ownerAddress.toLowerCase()) {
        setAccount(selected);
        messageApi.error("This wallet is not authorised for admin access.");
        return;
      }

      setAccount(selected);
      router.replace("/panel/admin");
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      messageApi.error("Failed to connect to MetaMask.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Layout className="min-h-[100%] font-sans bg-[url('/background.jpg')] bg-cover bg-center">
      {contextHolder}
      <Content className="flex flex-col items-center justify-center">
        <Form className="flex flex-col items-center justify-start w-[420px] h-[400px] bg-white rounded-[15px] p-[40px]">
          <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
            Admin Login
          </div>
          <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
            Connect your MetaMask wallet to continue.
          </div>

          <div className="flex-1"></div>

          <Button
            size="large"
            className="w-[100%] rounded-[5px] h-[50px]"
            onClick={connectWallet}
            loading={isConnecting}
            disabled={isConnecting}
          >
            {account ? "Reconnect MetaMask" : "Connect MetaMask"}
          </Button>

          <Button
            size="large"
            className="w-[100%] mt-[10px] text-center h-[50px] min-h-[50px]"
            onClick={() => router.push("/login")}
          >
            Back to voter login
          </Button>
        </Form>
      </Content>
      <Footer className="text-center text-base bg-transparent font-light text-gray-600">
        Voting System ©2026 | All Rights Reserved
      </Footer>
    </Layout>
  );
}
