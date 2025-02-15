"use client";
import { Button, Layout, Modal, message } from "antd";
import { useState } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { getContractInstance } from "@/utils/contract";
const { Content, Footer } = Layout;

export default function Admin() {
  //switch back to account from useWeb3
  const account = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
  const { web3 } = useWeb3();
  const [candidate, setCandidate] = useState("");
  const [id, setID] = useState("");
  const [txData, setTxData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeError, setRemoveError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const addCandidate = async () => {
    console.log("add candidate triggered");
    console.log("Candidate value is:", candidate);
    if (!web3 || !account) {
      console.error("Web3 or account not found");
      return;
    }
    if (!candidate.trim()) {
      console.error("Candidate name cannot be empty");
      return;
    }
    try {
      const contract = getContractInstance(web3);
      const tx = await contract.methods
        .addCandidate(candidate.trim())
        .send({ from: account });
      console.log("Transaction successful:", tx);
      setTxData(tx);
      setIsModalVisible(true);
    } catch (error: any) {
      console.error("Transaction failed:", error);
      messageApi.error("Failed to add candidate.");
    }
  };

  const removeCandidate = async () => {
    setRemoveError(""); 
    if (!web3 || !account) {
      console.error("Web3 or account not found");
      return;
    }
    if (!id.trim() || isNaN(parseInt(id))) {
      messageApi.error("Please enter a valid candidate ID.");
      return;
    }
    try {
      const candidateId = parseInt(id);
      const contract = getContractInstance(web3);
      const tx = await contract.methods
        .removeCandidate(candidateId)
        .send({ from: account });
      console.log("Transaction receipt:", tx);
      setTxData(tx);
      setIsModalVisible(true);
      if (!tx.status) {
        setRemoveError("Candidate does not exist.");
        messageApi.error("Candidate does not exist.");
      } else {
        messageApi.success("Candidate removed successfully.");
      }
    } catch (error: any) {
      console.error("Transaction failed:", error);
      if (error.message.includes("Candidate does not exist")) {
        setRemoveError("Candidate does not exist.");
        messageApi.error("Candidate does not exist.");
      } else {
        setRemoveError("An error occurred while removing the candidate.");
        messageApi.error("Transaction failed.");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="min-h-screen flex flex-col font-sans bg-gray-100 p-10">
      {contextHolder}
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-5 mb-3">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-500 text-sm">
        You are authorised to make the following changes to the voting system.
      </p>
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
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={addCandidate}
            >
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
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                  setID(value);
                }
              }}
            />
            <Button
              type="primary"
              shape="round"
              size="large"
              danger
              onClick={removeCandidate}
              disabled={!id.trim() || isNaN(parseInt(id))}
            >
              Remove
            </Button>
            {removeError && (
              <p style={{ color: "red", fontSize: "16px" }}>{removeError}</p>
            )}
          </div>
        </section>
      </Content>

      <Footer className="text-center text-base font-light text-gray-600 mt-10 hidden md:block">
        Voting System ©2025 | All Rights Reserved
      </Footer>
      
      <Modal
        title={
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Transaction Details
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {txData ? (
          <div>
            <p style={{ fontSize: "16px" }}>
              <strong>Transaction Hash:</strong> {txData.transactionHash}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>Block Hash:</strong> {txData.blockHash}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>Block Number:</strong>{" "}
              {txData.blockNumber ? txData.blockNumber.toString() : ""}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>Cumulative Gas Used:</strong>{" "}
              {txData.cumulativeGasUsed
                ? txData.cumulativeGasUsed.toString()
                : ""}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>Effective Gas Price:</strong>{" "}
              {txData.effectiveGasPrice
                ? txData.effectiveGasPrice.toString()
                : ""}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>From:</strong> {txData.from}
            </p>
            <p style={{ fontSize: "16px" }}>
              <strong>Gas Used:</strong>{" "}
              {txData.gasUsed ? txData.gasUsed.toString() : ""}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: "16px" }}>No transaction details available.</p>
        )}
      </Modal>
    </Layout>
  );
}
