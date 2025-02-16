"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../../../context/Web3Context";
import CandidateCard from "@/components/CandidateCard";
import { Row, Col, Typography } from "antd";
import { getContractInstance } from "@/utils/contract";

const { Title } = Typography;

interface Candidate {
  id: number;
  name: string;
  votes: number;
}

const Cast: React.FC = () => {
  const { web3 } = useWeb3();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const fetchCandidates = useCallback(async () => {
    if (!web3) return;
    try {
      const contract = getContractInstance(web3);
      const candidatesData = await contract.methods.getAllCandidates().call();
      
      const formattedCandidates = Array.isArray(candidatesData)
        ? candidatesData.map((c: any, index: number) => ({
            id: index + 1,
            name: c.name,
            votes: Number(c.voteCount),
          }))
        : [];
      
      const cleanedCandidates = formattedCandidates.filter((candidate) => candidate.name !== "");
      setCandidates(cleanedCandidates);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  }, [web3]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <div style={{ maxWidth: "90%", margin: "20px auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        {candidates.length > 0 ? "All Candidates" : "No Candidates"}
      </Title>

      <Row gutter={[32, 32]} justify="center">
        {candidates.map((candidate) => (
          <Col xs={24} sm={12} md={8} lg={6} key={candidate.id} style={{ display: "flex", justifyContent: "center" }}>
            <CandidateCard id={candidate.id} name={candidate.name} votes={candidate.votes} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cast;
