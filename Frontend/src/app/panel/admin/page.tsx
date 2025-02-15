"use client";
import { Button, Layout } from "antd";
import { useState} from "react";
import { useWeb3 } from "@/context/Web3Context";
import { getContractInstance } from "@/utils/contract";
const { Content, Footer } = Layout;

//TO-DO: add user account check so no one other than the owner can access this page

export default function Admin() {
  const { web3, account } = useWeb3();
  const [candidate, setCandidate] = useState("")
  const [id, setID] = useState(0)
  const addCandidate = async () => {
    console.log("add candidate trigerred");
    console.log("Candidate value is: ", candidate);
    if (!web3 || !account) {
      console.error("Web3 or account not found");
      return;
    }

    try {
      const contract = getContractInstance(web3); 
      const tx = await contract.methods.addCandidate(candidate.trim()).send({ from: account });

      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const removeCandidate = async () => {
    if(!web3 || !account){
      //add toast
      return;
    }
    try {
      const contract = getContractInstance(web3);
      const tx = await contract.methods.removeCandidate(id).send({ from: account });

      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <Layout className="min-h-screen flex flex-col font-sans bg-gray-100 p-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-5 mb-3">Admin Dashboard</h1>
      <p className="text-center text-gray-500 text-sm">You are authorised to make the following changes to te voting system.</p>
      <Content className="flex-grow flex flex-col items-center justify-center gap-10 md:flex-row">
        <section className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
          <h1 className="text-xl font-semibold mb-4">Add Candidate</h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Candidate Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
            />
            <Button type="primary" shape="round" size="large" onClick={addCandidate}>
              Add
            </Button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
          <h1 className="text-xl font-semibold mb-4">Remove Candidate</h1>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Candidate ID"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={id}
              onChange={(e) => setID(parseInt(e.target.value))}
            />
            <Button type="primary" shape="round" size="large" danger onClick={removeCandidate}>
              Remove
            </Button>
          </div>
        </section>
      </Content>

      <Footer className="text-center text-base font-light text-gray-600 mt-10 hidden md:block">
        Voting System ©2025 | All Rights Reserved
      </Footer>
    </Layout>
  );
}
