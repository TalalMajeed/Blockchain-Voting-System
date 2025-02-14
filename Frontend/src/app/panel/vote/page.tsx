"use client";
import React from "react";
import { useWeb3 } from "../../../context/Web3Context";
import { useUser } from "../../../context/UserContext";
import CandidateCard from "@/components/CandidateCard";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

interface Candidate {
  id: number;
  name: string;
  votes: number;
}

//dummy data for designing page layout
const candidates: Candidate[] = [
  { id: 1, name: "John Doe", votes: 320 },
  { id: 2, name: "Jane Smith", votes: 210 },
  { id: 3, name: "Alex Johnson", votes: 150 },
  { id: 4, name: "Emily Davis", votes: 275 },
];

const Cast: React.FC = () => {
  const { web3, account } = useWeb3();
  const { email, phone } = useUser();

  return (
    <div style={{ maxWidth: "90%", margin: "20px auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        All Candidates
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
