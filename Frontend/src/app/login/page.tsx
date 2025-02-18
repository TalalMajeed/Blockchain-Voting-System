"use client";

import { Layout, Typography } from "antd";
import { useState, useEffect } from "react";
import { Button, Form, Input, Checkbox } from "antd";
const { Content, Footer } = Layout;
import Web3 from "web3";
import { useWeb3 } from "../../context/Web3Context";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [page, setPage] = useState(1);
  return (
    <Layout className="min-h-[100%] font-sans bg-[url('/background.jpg')] bg-cover bg-center">
      <Content className="flex flex-col items-center justify-center">
        {page == 1 && <Base setPage={setPage} />}
        {page == 2 && <Account />}
      </Content>
      <Footer className="text-center text-base bg-transparent font-light text-gray-600">
        Voting System ©2025 | All Rights Reserved
      </Footer>
    </Layout>
  );
}

function Base(props: { setPage: (page: number) => void }) {
  const { setEmail, email, setPhone, phone } = useUser();
  return (
    <Form className="flex flex-col items-center justify-start w-[420px] h-[500px] bg-white rounded-[15px] p-[40px]">
      <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
        System Login
      </div>
      <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
        Please Enter the following details to register for the voting poll!
      </div>
      <Form.Item
        name="email"
        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[70px] font-light"
        rules={[
          {
            required: true,
            message: "Please enter your email!",
          },
        ]}
      >
        <Input
          size="large"
          value={email?.toString()}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[100%] rounded-[5px] h-[50px]"
          placeholder="Enter your Email"
        />
      </Form.Item>
      <Form.Item
        name="phone"
        className="w-[100%] m-[0px] mt-[5px] mb-[10px] pt-[20px] pb-[20px] h-[80px] font-light"
        rules={[
          {
            required: true,
            message: "Please enter your phone!",
          },
        ]}
      >
        <Input
          size="large"
          value={phone?.toString()}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[100%] rounded-[5px] h-[50px]"
          placeholder="Enter Phone No."
        />
      </Form.Item>
      <div className="flex-1"></div>
      <hr className="border-t-[1px] w-[100%]" />
      <div className="flex-1"></div>
      <Form.Item
        name="submit"
        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]"
      >
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-[100%] rounded-[5px] h-[50px]"
          onClick={() => {
            if (email && phone) {
              props.setPage(2);
            }
          }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
}

function Account() {
  const { account, isConnecting, web3, setAccount, setIsConnecting, setWeb3 } =
    useWeb3();

  const router = useRouter();

  //testing owner functionality
  const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    setIsConnecting(true);

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsConnecting(false);
      return;
    }

    setIsConnecting(false);
  };

  return (
    <Form className="flex flex-col items-center justify-start w-[420px] h-[500px] bg-white rounded-[15px] p-[40px]">
      <div className="text-4xl font-semibold text-left w-[100%] pt-[20px]">
        Wallet Connect
      </div>
      <div className="text-base font-light text-left w-[100%] pb-[10px] pt-[20px]">
        Please Connect your MetaMask Account to Vote for a Candidate!
      </div>
      <div className="flex-1"></div>

      <Button
        size="large"
        htmlType="submit"
        className="w-[100%] rounded-[5px] h-[50px]"
        href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        target="_blank"
      >
        Install MetaMask
      </Button>

      <Button
        size="large"
        className="w-[100%] rounded-[5px] h-[50px] mt-[20px]"
        onClick={connectWallet}
        loading={isConnecting}
        disabled={isConnecting || !!account}
      >
        {isConnecting
          ? "Connecting..."
          : account
          ? "Connected Wallet!"
          : "Connect MetaMask"}
      </Button>

      <div className="flex-1"></div>
      <hr className="border-t-[1px] w-[100%]" />

      <Form.Item
        name="submit"
        className="w-[100%] m-[0px] pt-[20px] pb-[20px] h-[80px]"
      >
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-[100%] rounded-[5px] h-[50px]"
          disabled={!account}
          onClick={() => {
            if(account){
              //push to admin panel instead of voter if user is owner
              if(account && ownerAddress && account.toLowerCase() === ownerAddress.toLowerCase()){
                console.log("Owner Address from login: ", ownerAddress);
                console.log("Requesting Address from login: ", account);
                router.push("/panel/admin");
              }
              else{
                router.push("/panel/vote");
              }
            }
           
          }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
}
