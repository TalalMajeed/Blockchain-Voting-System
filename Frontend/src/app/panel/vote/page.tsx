
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../../../context/Web3Context";
import CandidateCard from "@/components/CandidateCard";
import { Row, Col, Typography, message, Modal, Button } from "antd";
import { getContractInstance } from "@/utils/contract";
import { fetchCandidatesUtil, Candidate } from "@/utils/fetchCandidates";
import Link from "next/link";

const { Title } = Typography;

const Cast: React.FC = () => {
  const { web3, account } = useWeb3();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [txData, setTxData] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [hasVoted, setHasVoted] = useState(false);

  //TODO: checkIfVoted function that checks for accounts that have voted in the backend
  //useEffect to checkifVoted
  const voteCandidate = async (candidateId: number) => {
    const candidateIndex = candidateId - 1;
    if (!web3 || !account ) {
      messageApi.error("Web3 or account not found.");
      return;
    }
    if(hasVoted){
      messageApi.error("You have already voted");
      return;
    }

    try {
      const contract = getContractInstance(web3);
      const tx = await contract.methods.vote(candidateIndex).send({ from: account });

      console.log("Transaction receipt:", tx);
      
      if (!tx.status) {
        messageApi.error("Voting failed. Candidate may not exist.");
      } else {
        setIsUpdated(true);
        messageApi.success("Vote cast successfully.");
        setTxData(tx);
        setIsModalVisible(true);
        setHasVoted(true);
        setIsUpdated(false);
      }
    } catch (error: any) {
      console.error("Transaction failed:", error);
      messageApi.error(error.message.includes("Candidate does not exist") ? "Candidate does not exist." : "Transaction failed.");
    }
  };

  const fetchCandidates = useCallback(async () => {
    if (!web3) return;
    if(hasVoted) return;
    const data = await fetchCandidatesUtil(web3);
    setCandidates(data);
  }, [web3, hasVoted]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates, isUpdated]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
    {contextHolder}
    {hasVoted ? ( <div style={{ textAlign: "center", marginTop: "20px" }}>
    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      Your vote has been casted and you can no longer access the voting panel.
    </p>
    <Link href="/" >
      <p style={{ fontSize: "16px", color: "blue", textDecoration: "underline", cursor: "pointer" }}>
        Go back to home
      </p>
    </Link>
  </div>
    ) : (
      <>
      
      <div style={{ maxWidth: "90%", margin: "20px auto", padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          {candidates.length > 0 ? "All Candidates" : "No Candidates"}
        </Title>

        <Row gutter={[32, 32]} justify="center">
          {candidates.map((candidate) => (
            <Col xs={24} sm={12} md={8} lg={6} key={candidate.id} style={{ display: "flex", justifyContent: "center" }}>
              <CandidateCard id={candidate.id + 1} name={candidate.name} votes={isNaN(candidate.votes) ? 0 : candidate.votes} onVote={voteCandidate} />
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title={<div style={{ fontSize: "24px", fontWeight: "bold" }}>Transaction Details</div>}
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
            <p style={{ fontSize: "16px" }}><strong>Transaction Hash:</strong> {txData.transactionHash}</p>
            <p style={{ fontSize: "16px" }}><strong>Block Hash:</strong> {txData.blockHash}</p>
            <p style={{ fontSize: "16px" }}><strong>Block Number:</strong> {txData.blockNumber?.toString()}</p>
            <p style={{ fontSize: "16px" }}><strong>Cumulative Gas Used:</strong> {txData.cumulativeGasUsed?.toString()}</p>
            <p style={{ fontSize: "16px" }}><strong>Effective Gas Price:</strong> {txData.effectiveGasPrice?.toString()}</p>
            <p style={{ fontSize: "16px" }}><strong>From:</strong> {txData.from}</p>
            <p style={{ fontSize: "16px" }}><strong>Gas Used:</strong> {txData.gasUsed?.toString()}</p>
          </div>
        ) : (
          <p style={{ fontSize: "16px" }}>No transaction details available.</p>
        )}
      </Modal>
    </>
    )}
    </>
  );
};

export default Cast;
