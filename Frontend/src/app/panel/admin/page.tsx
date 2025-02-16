"use client";
import { Button, Layout, Modal, message, Row, Col, Typography } from "antd";
import { useState, useEffect } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { getContractInstance } from "@/utils/contract";
const { Content, Footer} = Layout;
const { Title } = Typography;
import AdminDisplayCard from "@/components/AdminDisplayCard";

interface Candidate {
  id: number;
  name: string;
  votes: number;
}
export default function Admin() {

  const owner = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
  const { web3, account } = useWeb3();
  const [candidate, setCandidate] = useState("");
  const [id, setID] = useState("");
  const [txData, setTxData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeError, setRemoveError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [updated, setIsUpdated] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      if (!web3 || !account) return;
      try {
        const ownerAddress = owner?.toLowerCase();
        const accountAddress = account.toLowerCase();
        setIsOwner(ownerAddress === accountAddress);
      } catch (error) {
        console.error("Error checking ownership:", error);
      }
    };
  
    checkOwnership();
  }, [web3, account]);

  useEffect(() => {
    if(updated){
      fetchCandidates();
      setIsUpdated(false);
    }
  }, [updated]);


    const fetchCandidates = async () => {
      if (!web3) return;
      try {
        const contract = getContractInstance(web3);
        const candidatesData = await contract.methods.getAllCandidates().call();
        
        const formattedCandidates = Array.isArray(candidatesData)
          ? candidatesData.map((c: any, index: number) => ({
              id: Number(c.id),
              name: c.name,
              votes: Number(c.voteCount),
            }))
          : [];
        
          const cleanedCandidates = formattedCandidates.filter((candidate) => candidate.name !== "");
        setCandidates(cleanedCandidates);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      }
    };

  const addCandidate = async () => {
    console.log("add candidate triggered");
    console.log("Candidate value is:", candidate);
    if (!web3 || !account) {
      console.error("Web3 or account not found");
      return;
    }
    if (!candidate.trim()) {
      setAddError("Candidate name cannot be empty.");
      return;
    }
    try {
      const contract = getContractInstance(web3);
      const tx = await contract.methods
        .addCandidate(candidate.trim())
        .send({ from: account });
      console.log("Transaction successful:", tx);
      setIsUpdated(true);
      setTxData(tx);
      setIsModalVisible(true);

      if(tx.status){
        setCandidate("");
      }
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
    if (!id.trim() || isNaN(parseInt(id)) || parseInt(id) < 1) {
      messageApi.error("Please enter a valid candidate ID.");
      return;
    }
    try {
      const candidateId = parseInt(id) - 1;
      const contract = getContractInstance(web3);
      const tx = await contract.methods
        .removeCandidate(candidateId)
        .send({ from: account });
      console.log("Transaction receipt:", tx);
      if (!tx.status) {
        setRemoveError("Candidate does not exist.");
        messageApi.error("Candidate does not exist.");
      } else {
        setIsUpdated(true);
        messageApi.success("Candidate removed successfully.");
        setTxData(tx);
        setIsModalVisible(true);

        setID("");
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
    <>
    {contextHolder}
    {!isOwner ? ( <p className="text-center text-red-500 text-lg">You are not authorised to access this page.</p> ) : (
    <Layout className="min-h-screen flex flex-col font-sans bg-gray-100 p-10">
      {contextHolder}
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-5 mb-3">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-500 text-sm mb-20">
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
            {addError && (
              <p style={{ color: "red", fontSize: "16px" }}>{addError}</p>
            )}
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

        <hr className="border-gray-300 mt-20 mb-5" />
        {candidates.length > 0 ? (
          <div style={{ maxWidth: "90%", margin: "20px auto", padding: "20px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
            {updated ? "Updated" : "Current"} List of Candidates
          </Title>
          
          <Row gutter={[32, 32]} justify="space-between" >
            {candidates.map((candidate) => (
              <Col 
                xs={24} 
                sm={12} 
                md={8} 
                lg={6} 
                key={candidate.id} 
                style={{ display: "flex", justifyContent: "space-around"}}
              >
                 <AdminDisplayCard id={candidate.id + 1} name={candidate.name} votes={isNaN(candidate.votes) ? 0 : candidate.votes} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No candidates yet.</p>
      )}
        
      

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
    )}
    </>
  );
}
