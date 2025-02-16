
"use client";

import React from "react";
import { Card, Button, Avatar } from "antd";
import { StarOutlined, UserOutlined } from "@ant-design/icons";

interface CandidateCardProps {
  id: number;
  name: string;
  votes: number;
  onVote: (id: number) => void; 
}

const CandidateCard: React.FC<CandidateCardProps> = ({ id, name, votes, onVote }) => {
  return (
    <Card
      bordered={true}
      hoverable
      style={{
        width: 270,
        borderRadius: 15,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      <Avatar
        size={100}
        icon={<UserOutlined />}
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px solid white",
          backgroundColor: "#3dbf71",
          outline: "4px solid #3dbf71",
        }}
      />

      <div style={{ marginTop: 110 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 70, fontSize: "20px" }}>
          {name}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <StarOutlined style={{ color: "#3dbf71", fontSize: 14 }} />
            <p style={{ margin: 0, fontSize: "17px" }}>
              <strong>Votes:</strong> {votes}
            </p>
          </div>
        </div>

        <Button
          type="primary"
          shape="round"
          size="large"
          style={{
            marginTop: 20,
            width: "80%",
            backgroundColor: "#3dbf71",
            border: "none",
          }}
          onClick={() => onVote(id)} 
        >
          Vote
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;
