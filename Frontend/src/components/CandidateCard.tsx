
"use client";

import React from "react";
import { Card, Button, Avatar } from "antd";
import { StarOutlined } from "@ant-design/icons";
import {UserOutlined} from "@ant-design/icons";

interface CandidateCardProps {
  id: number;
  name: string;
  votes: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ id, name, votes }) => {
  return (
    <Card
      bordered={false}
      style={{
        width: 270,
        borderRadius: 15,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "20%",
          backgroundColor: "#3dbf71",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <Avatar
        size={100}
        icon={<UserOutlined color="white" />}
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px solid white",
          outline: "4px solid #3dbf71",
          backgroundColor: "#3dbf71",
          color: "white", 
          fontSize: 48, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <div style={{ marginTop: 110 }}>
        <div style={{marginBottom: 50}}>
        <h3 style={{ fontWeight: 600, fontSize: "20px" }}>
          {name}
        </h3>
        <p style={{fontSize: "14px", color: "rgba(0,0,0,0.6)"}}>id: {id} </p>
        </div>
        

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
        >
          Vote
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;

